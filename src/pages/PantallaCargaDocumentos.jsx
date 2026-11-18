import { useState } from 'react';
import Icon from '../components/ui/Icon.jsx';
import Boton from '../components/ui/Boton.jsx';
import Banner from '../components/ui/Banner.jsx';
import Modal from '../components/ui/Modal.jsx';
import ClientShell from '../components/layout/ClientShell.jsx';
import DocumentDropzone from '../components/documents/DocumentDropzone.jsx';
import { useCase } from '../context/CaseContext.jsx';
import { obtenerDocumentos } from '../data/mockCase.js';
import './PantallaCargaDocumentos.css';

const GARANTIAS = [
  { icono: 'shield', texto: 'Conexión cifrada de extremo a extremo' },
  { icono: 'checkCircle', texto: 'Validación automática de documentación' },
  { icono: 'help', texto: 'Soporte disponible las 24 horas' },
];

export default function PantallaCargaDocumentos() {
  const { formulario, documentosSubidos, facturaPendiente, marcarDocumentoSubido, resolverFacturaPendiente, irA } =
    useCase();

  const [modalVisto, setModalVisto] = useState(false);
  const documentosBase = obtenerDocumentos(formulario.conAbogado);

  const todosCargados = documentosBase.every((doc) => documentosSubidos[doc.id]);

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (todosCargados) {
      irA('analisis');
    }
  };

  const manejarSeleccion = (id, archivo) => {
    if (id === 'factura' && facturaPendiente) {
      resolverFacturaPendiente(archivo);
      return;
    }

    marcarDocumentoSubido(id, archivo);

    // Al cargar el primer documento, se autocompletan los demás para agilizar la demo.
    const esPrimerDocumento = Object.keys(documentosSubidos).length === 0;
    if (esPrimerDocumento) {
      documentosBase.forEach((documento) => {
        if (documento.id !== id) {
          marcarDocumentoSubido(documento.id, archivo);
        }
      });
    }
  };

  return (
    <ClientShell>
      <div className="carga-docs">
        <div className="carga-docs__header">
          <h1>Documentación Requerida</h1>
          {facturaPendiente ? (
            <Banner tono="alerta">
              La factura que recibimos no pudo validarse. Cargue nuevamente el documento correcto para
              continuar.
            </Banner>
          ) : (
            <Banner tono="info">
              Perfecto, ya tenemos sus datos iniciales. Cargue los siguientes documentos para continuar.
            </Banner>
          )}
        </div>

        <form className="carga-docs__form" onSubmit={manejarEnvio}>
          <div className="carga-docs__grid">
            {documentosBase.map((documento) => (
              <DocumentDropzone
                key={documento.id}
                documento={documento}
                archivo={documentosSubidos[documento.id]}
                pendiente={documento.id === 'factura' && facturaPendiente}
                onSeleccionar={manejarSeleccion}
              />
            ))}

            <div className="trust-card">
              <p className="trust-card__title">Tus documentos están seguros</p>
              <ul className="trust-card__list">
                {GARANTIAS.map((item) => (
                  <li key={item.texto}>
                    <span className="trust-card__icon">
                      <Icon nombre={item.icono} size={15} />
                    </span>
                    {item.texto}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {!facturaPendiente && (
            <div className="carga-docs__actions">
              <Boton tipo="submit" disabled={!todosCargados}>
                Perfecto, ya tenemos sus documentos
                <Icon nombre="arrowRight" size={18} />
              </Boton>
            </div>
          )}
        </form>
      </div>

      {facturaPendiente && !modalVisto && (
        <Modal
          tono="alerta"
          titulo="Falta subir la factura de reparación"
          acciones={
            <Boton variante="secundario" onClick={() => setModalVisto(true)}>
              Entendido
            </Boton>
          }
        >
          El archivo cargado en &quot;Factura de reparación&quot; corresponde a una licencia de conducir,
          no a una factura de reparación. Por favor suba el documento correcto para continuar con la
          validación de su siniestro.
        </Modal>
      )}
    </ClientShell>
  );
}
