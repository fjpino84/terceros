import Icon from '../components/ui/Icon.jsx';
import Boton from '../components/ui/Boton.jsx';
import ClientShell from '../components/layout/ClientShell.jsx';
import { useCase } from '../context/CaseContext.jsx';
import './PantallaResultado.css';

const PROXIMOS_PASOS = [
  {
    icono: 'location',
    titulo: 'Acercate a una sucursal',
    texto: 'Nuestros asesores pueden ayudarte a resolver este inconveniente de forma presencial.',
  },
  {
    icono: 'bell',
    titulo: 'Contactanos por WhatsApp',
    texto: 'Envíanos un mensaje a través de WhatsApp para resolver tus dudas.',
  },
  {
    icono: 'help',
    titulo: 'Llamanos al 758920211',
    texto: 'También puedes contactarte con nosotros por teléfono durante el horario de atención.',
  },
];

export default function PantallaResultadoRechazo() {
  const { referencia, reiniciar } = useCase();

  return (
    <ClientShell>
      <div className="resultado resultado--rechazo">
        <div className="rechazo__principal">
          <div className="resultado__card resultado__card--rechazo">
            <span className="resultado__icon resultado__icon--rechazo">
              <Icon nombre="xCircle" size={28} />
            </span>
            <h1>Siniestro Rechazado</h1>
            <p className="resultado__lead">
              Muchas gracias por ingresar la información requerida. Lamentablemente, hemos tenido
              problemas al procesar sus documentos. Para poder resolverlo, sugerimos se pueda acercar a
              algunas de nuestras sucursales. Cualquier duda o consulta, puede contactarse con nosotros
              a nuestro WhatsApp o llamando al 758920211.
            </p>
            <div className="resultado__ref">
              <span>N° de referencia</span>
              <strong>{referencia}</strong>
            </div>
          </div>

          <div className="resultado__acciones resultado__acciones--rechazo">
            <Boton variante="primario">
              <Icon nombre="location" size={17} /> Ver oficinas cercanas
            </Boton>
            <Boton variante="secundario" onClick={reiniciar}>
              Volver al inicio
            </Boton>
          </div>
        </div>

        <aside className="rechazo__pasos">
          <p className="rechazo__pasos-title">¿Qué podés hacer ahora?</p>
          <ul>
            {PROXIMOS_PASOS.map((paso) => (
              <li key={paso.titulo}>
                <span className="rechazo__pasos-icon">
                  <Icon nombre={paso.icono} size={17} />
                </span>
                <span>
                  <strong>{paso.titulo}</strong>
                  <span className="rechazo__pasos-text">{paso.texto}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </ClientShell>
  );
}
