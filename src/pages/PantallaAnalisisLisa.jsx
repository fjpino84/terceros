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
  obtenerDocumentos,
  lecturaExito,
  lecturaRechazo,
  reglasNegocioExito,
  reglasNegocioRechazo,
} from '../data/mockCase.js';
import './PantallaAnalisisLisa.css';


export default function PantallaAnalisisLisa() {
  const { formulario, escenario, referencia, facturaPendiente, facturaValidada, marcarFacturaPendiente, irA } =
    useCase();
  const esExito = escenario === 'exito';

  // Los documentos analizados dependen del formulario (el carnet de abogado solo si hay abogado).
  const documentosBase = useMemo(() => obtenerDocumentos(formulario.conAbogado), [formulario.conAbogado]);
  const ORDEN_DOCUMENTOS = useMemo(() => documentosBase.map((doc) => doc.id), [documentosBase]);
  const DOCUMENTOS_PREVIOS_A_LA_FACTURA = ORDEN_DOCUMENTOS.filter((id) => id !== 'factura');

  // En el escenario de éxito, LISA solo da por buena la factura tras el ciclo de corrección.
  const facturaCorregida = !esExito || facturaValidada;

  const [mostrarModalFraude, setMostrarModalFraude] = useState(false);
  const [fraudeAlertaEnviada, setFraudeAlertaEnviada] = useState(false);

  const lecturas = useMemo(() => {
    const base = esExito ? lecturaExito : lecturaRechazo;
    if (esExito && !facturaCorregida) {
      return {
        ...base,
        factura: {
          estado: 'alerta',
          titulo: 'Documento no reconocido como factura',
          campos: [{ etiqueta: 'Detectado como', valor: 'Licencia de conducir' }],
        },
      };
    }
    return base;
  }, [esExito, facturaCorregida]);

  // Al volver desde Carga de Documentos con la factura corregida, los documentos que ya
  // habían sido validados se muestran directo con su veredicto: solo se re-anima la factura.
  const documentosYaResueltos = facturaValidada ? DOCUMENTOS_PREVIOS_A_LA_FACTURA : [];

  const { fases, indiceActual, totalAAnimar, terminado } = useAnalysisSequence(
    ORDEN_DOCUMENTOS,
    lecturas,
    true,
    documentosYaResueltos,
  );

  // Cuando LISA detecta que la factura no es válida, devuelve al cliente a Carga de
  // Documentos en vez de resolver el problema en esta consola interna.
  useEffect(() => {
    if (esExito && terminado && !facturaCorregida && !facturaPendiente) {
      marcarFacturaPendiente();
    }
  }, [esExito, terminado, facturaCorregida, facturaPendiente, marcarFacturaPendiente]);

  const archivoParaFila = (id) => {
    if (id === 'factura' && esExito && !facturaCorregida) {
      return 'licencia.png';
    }
    if (id === 'factura') {
      return 'presupuesto.png';
    }
    return documentosBase.find((doc) => doc.id === id)?.archivo;
  };

  const reglasBase = esExito ? reglasNegocioExito : reglasNegocioRechazo;
  const reglas = useMemo(
    () => reglasBase.filter((regla) => ORDEN_DOCUMENTOS.includes(regla.documento)),
    [reglasBase, ORDEN_DOCUMENTOS],
  );
  const ordenReglas = useMemo(() => reglas.map((regla) => regla.id), [reglas]);
  const resultadosReglas = useMemo(
    () => Object.fromEntries(reglas.map((regla) => [regla.id, regla])),
    [reglas],
  );
  const documentosListos = terminado && facturaCorregida;

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

  const estadoFinal = esExito ? 'APROBADO' : 'RECHAZADO — DOCUMENTOS NO APORTADOS';

  const puedeAvanzar = veredictoListo;

  const progreso =
    totalAAnimar === 0 ? 100 : Math.round((Math.min(indiceActual, totalAAnimar) / totalAAnimar) * 100);

  let tonoEstado = 'neutro';
  let tituloEstado = facturaValidada ? 'Revalidando factura…' : 'Analizando documentación…';
  let descripcionEstado = facturaValidada
    ? 'Se recibió el documento correcto. LISA está terminando de validar el caso.'
    : `Procesando documento ${Math.min(indiceActual + 1, totalAAnimar)} de ${totalAAnimar}.`;

  if (veredictoListo) {
    tonoEstado = esExito ? 'ok' : 'error';
    tituloEstado = estadoFinal;
    descripcionEstado = esExito
      ? 'Análisis completado con éxito. Todos los documentos cumplen las reglas de negocio.'
      : 'Se incumplieron reglas de negocio. El motor rechazó los documentos y solicitó su reaporte.';
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
          titulo="Acciones de control ejecutadas"
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
          La licencia de conducir está vencida más allá de la tolerancia de 90 días y la factura fue emitida
          antes del siniestro. El resto de los documentos se aprobó, algunos con mensaje de alerta. En el caso <strong>{referencia}</strong> se rechazó la iniciativa, los
          documentos quedaron marcados como &quot;No Aportado&quot; y se solicitó automáticamente su reaporte.
        </Modal>
      )}
    </LisaConsoleShell>
  );
}
