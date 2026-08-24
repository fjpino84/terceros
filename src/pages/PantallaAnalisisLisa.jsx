import { useEffect, useMemo, useState } from 'react';
import Icon from '../components/ui/Icon.jsx';
import Boton from '../components/ui/Boton.jsx';
import Modal from '../components/ui/Modal.jsx';
import LisaConsoleShell from '../components/layout/LisaConsoleShell.jsx';
import DocumentAnalysisRow from '../components/documents/DocumentAnalysisRow.jsx';
import BusinessRuleCard from '../components/documents/BusinessRuleCard.jsx';
import { useAnalysisSequence } from '../hooks/useAnalysisSequence.js';
import { useCase } from '../context/CaseContext.jsx';
import {
  documentosBase,
  lecturaExito,
  lecturaRechazo,
  reglasNegocioExito,
  reglasNegocioRechazo,
} from '../data/mockCase.js';
import './PantallaAnalisisLisa.css';

const ORDEN_DOCUMENTOS = documentosBase.map((doc) => doc.id);
const DOCUMENTOS_PREVIOS_AL_PRESUPUESTO = ORDEN_DOCUMENTOS.filter((id) => id !== 'presupuesto');

export default function PantallaAnalisisLisa() {
  const { escenario, referencia, presupuestoPendiente, presupuestoValidado, marcarPresupuestoPendiente, irA } =
    useCase();
  const esExito = escenario === 'exito';

  // En el escenario de éxito, LISA solo da por bueno el presupuesto tras el ciclo de corrección.
  const presupuestoCorregido = !esExito || presupuestoValidado;

  const [mostrarModalFraude, setMostrarModalFraude] = useState(false);
  const [fraudeAlertaEnviada, setFraudeAlertaEnviada] = useState(false);

  const lecturas = useMemo(() => {
    const base = esExito ? lecturaExito : lecturaRechazo;
    if (esExito && !presupuestoCorregido) {
      return {
        ...base,
        presupuesto: {
          estado: 'alerta',
          titulo: 'Documento no reconocido como presupuesto',
          campos: [{ etiqueta: 'Detectado como', valor: 'Licencia de conducir' }],
        },
      };
    }
    return base;
  }, [esExito, presupuestoCorregido]);

  // Al volver desde Carga de Documentos con el presupuesto corregido, los documentos que ya
  // habían sido validados se muestran directo con su veredicto: solo se re-anima el presupuesto.
  const documentosYaResueltos = presupuestoValidado ? DOCUMENTOS_PREVIOS_AL_PRESUPUESTO : [];

  const { fases, indiceActual, totalAAnimar, terminado } = useAnalysisSequence(
    ORDEN_DOCUMENTOS,
    lecturas,
    true,
    documentosYaResueltos,
  );

  // Cuando LISA detecta que el presupuesto no es válido, devuelve al cliente a Carga de
  // Documentos en vez de resolver el problema en esta consola interna.
  useEffect(() => {
    if (esExito && terminado && !presupuestoCorregido && !presupuestoPendiente) {
      marcarPresupuestoPendiente();
    }
  }, [esExito, terminado, presupuestoCorregido, presupuestoPendiente, marcarPresupuestoPendiente]);

  const archivoParaFila = (id) => {
    if (id === 'presupuesto' && esExito && !presupuestoCorregido) {
      return 'licencia.png';
    }
    if (id === 'presupuesto') {
      return 'presupuesto.png';
    }
    return documentosBase.find((doc) => doc.id === id)?.archivo;
  };

  const reglas = esExito ? reglasNegocioExito : reglasNegocioRechazo;
  const ordenReglas = useMemo(() => reglas.map((regla) => regla.id), [reglas]);
  const resultadosReglas = useMemo(
    () => Object.fromEntries(reglas.map((regla) => [regla.id, regla])),
    [reglas],
  );
  const documentosListos = terminado && presupuestoCorregido;

  const {
    fases: fasesReglas,
    terminado: reglasTerminadas,
  } = useAnalysisSequence(ordenReglas, resultadosReglas, documentosListos, [], 260);

  const veredictoListo = documentosListos && reglasTerminadas;

  useEffect(() => {
    if (!esExito && veredictoListo) {
      const timer = setTimeout(() => setMostrarModalFraude(true), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [esExito, veredictoListo]);

  const estadoFinal = esExito ? 'PASSED' : 'RECHAZADO — FRAUDE / DOCUMENTACIÓN INVÁLIDA';

  const puedeAvanzar = veredictoListo;

  const progreso =
    totalAAnimar === 0 ? 100 : Math.round((Math.min(indiceActual, totalAAnimar) / totalAAnimar) * 100);

  let tonoEstado = 'neutro';
  let tituloEstado = presupuestoValidado ? 'Revalidando presupuesto…' : 'Analizando documentación…';
  let descripcionEstado = presupuestoValidado
    ? 'Se recibió el documento correcto. LISA está terminando de validar el caso.'
    : `Procesando documento ${Math.min(indiceActual + 1, totalAAnimar)} de ${totalAAnimar}.`;

  if (veredictoListo) {
    tonoEstado = esExito ? 'ok' : 'error';
    tituloEstado = estadoFinal;
    descripcionEstado = esExito
      ? 'Análisis completado con éxito. Todos los documentos fueron verificados.'
      : 'Se detectaron inconsistencias graves. El caso requiere revisión del equipo de fraude.';
  }

  return (
    <LisaConsoleShell>
      <div className="analisis-lisa">
        <div className={`analisis-lisa__status analisis-lisa__status--${tonoEstado}`}>
          <div>
            <p className="analisis-lisa__status-eyebrow">Estado del caso</p>
            <h1>{tituloEstado}</h1>
            <p className="analisis-lisa__status-desc">{descripcionEstado}</p>
            {!veredictoListo && (
              <div
                className="analisis-lisa__progress"
                role="progressbar"
                aria-valuenow={progreso}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progreso del análisis"
              >
                <div className="analisis-lisa__progress-fill" style={{ width: `${progreso}%` }} />
              </div>
            )}
          </div>
          <div className="analisis-lisa__status-ref">
            <span>ID de referencia</span>
            <strong>{referencia}</strong>
          </div>
        </div>

        <section className="analisis-lisa__section">
          <div className="analisis-lisa__rows">
            {documentosBase.map((documento) => (
              <DocumentAnalysisRow
                key={documento.id}
                documento={documento}
                archivoMostrado={archivoParaFila(documento.id)}
                fase={fases[documento.id]}
                lectura={['ok', 'alerta', 'error'].includes(fases[documento.id]) ? lecturas[documento.id] : null}
              />
            ))}
          </div>
        </section>

        <section className="analisis-lisa__section analisis-lisa__section--rules">
          <div className="analisis-lisa__rules-grid">
            {reglas.map((regla) => (
              <BusinessRuleCard key={regla.id} regla={regla} fase={fasesReglas[regla.id]} />
            ))}
          </div>
        </section>

        {puedeAvanzar && (
          <div className="analisis-lisa__cta">
            <Boton
              variante={esExito ? 'primario' : 'secundario'}
              onClick={() => irA(esExito ? 'resultadoExito' : 'resultadoRechazo')}
            >
              Ver pantalla del cliente
              <Icon nombre="arrowRight" size={18} />
            </Boton>
          </div>
        )}
      </div>

      {mostrarModalFraude && !fraudeAlertaEnviada && (
        <Modal
          tono="error"
          titulo="Alerta enviada al equipo de fraude"
          acciones={
            <Boton
              variante="secundario"
              onClick={() => {
                setFraudeAlertaEnviada(true);
                setMostrarModalFraude(false);
              }}
            >
              Entendido
            </Boton>
          }
        >
          Se detectaron documentos duplicados y una adulteración en fecha y monto del presupuesto. El caso
          <strong> {referencia}</strong> fue marcado para revisión manual y el equipo de fraude ya fue
          notificado automáticamente.
        </Modal>
      )}
    </LisaConsoleShell>
  );
}
