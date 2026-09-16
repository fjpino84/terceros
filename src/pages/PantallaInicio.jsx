import Icon from '../components/ui/Icon.jsx';
import { useCase } from '../context/CaseContext.jsx';
import logoAseguradora from '../assets/logos/logo-aseguradora-claro.png';
import logoLisa from '../assets/logos/logo-lisa.png';
import './PantallaInicio.css';

const PREGUNTAS_MANUALES = [
  { icono: 'id', texto: '¿Es la cédula correcta?' },
  { icono: 'car', texto: '¿La denuncia corresponde al siniestro?' },
  { icono: 'calendar', texto: '¿El registro sigue vigente?' },
];

const CONSECUENCIAS = [
  'Analistas senior atrapados en tareas de bajo valor',
  'Criterios distintos entre revisores (subjetividad)',
  'Reclamos que se estancan por falta de seguimiento',
  'Mayor exposición a fraude no detectado a tiempo',
];

const METRICAS = [
  { valor: '76 %', detalle: 'del volumen de documentación se valida sin intervención humana' },
  { valor: '60 %', detalle: 'de los siniestros mensuales totales con toda la documentación aprobada por LISA' },
  { valor: '+4.500', detalle: 'siniestros procesados mensualmente' },
];

export default function PantallaInicio() {
  const { iniciarEscenario } = useCase();

  return (
    <div className="inicio">
      <div className="inicio__panel">
        <header className="inicio__header">
          <div className="inicio__brands">
            <img src={logoAseguradora} alt="Seguros Horizonte" className="inicio__brand-logo" />
            <span className="inicio__brand-x">×</span>
            <img src={logoLisa} alt="LISA vigIA" className="inicio__brand-logo inicio__brand-logo--lisa" />
          </div>
          <p className="inicio__eyebrow">Demo de producto</p>
          <h1 className="inicio__title">Portal de Denuncias para Terceros</h1>
          <p className="inicio__lead">
            Simulación del flujo end-to-end: el tercero carga sus datos y documentos, LISA vigIA los
            analiza en tiempo real, y el caso se resuelve automáticamente.
          </p>
        </header>

        <div className="inicio__contexto">
          <section className="contexto-col">
            <p className="contexto-col__eyebrow">El punto de partida</p>
            <h2 className="contexto-col__title">El costo oculto de «leer» papeles</h2>
            <p className="contexto-col__texto">
              Hoy, un analista invierte gran parte de su día revisando manualmente si la cédula es real,
              si el registro está vigente o si la denuncia a la aseguradora es correcta. Es un trabajo
              repetitivo, lento y propenso al error humano por cansancio visual.
            </p>

            <ul className="preguntas">
              {PREGUNTAS_MANUALES.map((pregunta) => (
                <li key={pregunta.texto} className="preguntas__item">
                  <span className="preguntas__icon">
                    <Icon nombre={pregunta.icono} size={20} />
                  </span>
                  {pregunta.texto}
                </li>
              ))}
            </ul>

            <div className="consecuencias">
              <p className="consecuencias__title">Consecuencias para la aseguradora</p>
              <ul>
                {CONSECUENCIAS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="contexto-col contexto-col--resultados">
            <p className="contexto-col__eyebrow">Un caso real de negocios en Argentina</p>
            <h2 className="contexto-col__title">De administrar papeles a gestionar excepciones</h2>

            <ul className="metricas">
              {METRICAS.map((metrica) => (
                <li key={metrica.valor} className="metricas__item">
                  <strong className="metricas__valor">{metrica.valor}</strong>
                  <span className="metricas__detalle">{metrica.detalle}</span>
                </li>
              ))}
            </ul>

            <blockquote className="cita">
              LISA valida lo obvio y repetitivo; los expertos de siniestros quedan libres para los casos
              que realmente requieren criterio humano — fraude, complejidad y atención al cliente.
            </blockquote>
          </section>
        </div>

        <div className="inicio__scenarios">
          <button
            type="button"
            className="scenario-card scenario-card--exito"
            onClick={() => iniciarEscenario('exito')}
          >
            <span className="scenario-card__icon">
              <Icon nombre="checkCircle" size={26} />
            </span>
            <span className="scenario-card__body">
              <span className="scenario-card__title">Caso con documentación válida</span>
              <span className="scenario-card__desc">
                Documentos consistentes y vigentes. LISA aprueba el siniestro automáticamente.
              </span>
            </span>
            <Icon nombre="arrowRight" size={20} className="scenario-card__arrow" />
          </button>

          <button
            type="button"
            className="scenario-card scenario-card--rechazo"
            onClick={() => iniciarEscenario('rechazo')}
          >
            <span className="scenario-card__icon">
              <Icon nombre="xCircle" size={26} />
            </span>
            <span className="scenario-card__body">
              <span className="scenario-card__title">Caso con licencia vencida y fraude</span>
              <span className="scenario-card__desc">
                Licencia vencida y presupuesto adulterado. LISA rechaza y alerta al equipo de fraude.
              </span>
            </span>
            <Icon nombre="arrowRight" size={20} className="scenario-card__arrow" />
          </button>
        </div>

        <p className="inicio__foot">
          Ambos escenarios recorren los mismos tres pasos del portal: Datos Iniciales, Documentos y
          Resultados. Entre medio, LISA analiza el caso en su propia consola interna.
        </p>
      </div>
    </div>
  );
}
