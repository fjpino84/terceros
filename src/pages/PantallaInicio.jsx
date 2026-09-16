import { Fragment } from 'react';
import Icon from '../components/ui/Icon.jsx';
import { useCase } from '../context/CaseContext.jsx';
import logoAseguradora from '../assets/logos/logo-aseguradora-claro.png';
import logoLisa from '../assets/logos/logo-lisa.png';
import './PantallaInicio.css';

const PROBLEMAS = [
  {
    problema: 'Capacidad operativa insuficiente: número de analistas por debajo de la carga de trabajo real.',
    costo: ['', 'Backlog', ' creciente de casos y tiempos de respuesta excesivos.'],
  },
  {
    problema: 'Procesos actuales mayormente manuales y fragmentados.',
    costo: ['Baja eficiencia y mayor probabilidad de ', 'errores humanos.'],
  },
  {
    problema: 'Atención tardía de reclamos.',
    costo: ['', 'Impacto negativo', ' en la reputación de la compañía.'],
  },
  {
    problema: 'Reclamos que escalan a instancias de mediación por tiempos excesivos.',
    costo: ['', 'Costos adicionales', ' (honorarios legales, acuerdos desfavorables, tiempo de personal).'],
  },
  {
    problema: 'Falta de priorización automática o inteligencia en la derivación de casos.',
    costo: ['Uso ineficiente de recursos humanos y prolongación de los tiempos de respuesta.'],
  },
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

            <div className="problemas">
              <p className="problemas__head problemas__head--ancho">Principales problemas operativos actuales</p>
              <p className="problemas__head">Costos ocultos en el proceso</p>

              {PROBLEMAS.map((fila) => (
                <Fragment key={fila.problema}>
                  <p className="problemas__problema">{fila.problema}</p>
                  <span className="problemas__flecha" aria-hidden="true" />
                  <p className="problemas__costo">
                    {/* Los elementos impares del array van resaltados. */}
                    {fila.costo.map((parte, i) =>
                      i % 2 === 1 ? <strong key={i}>{parte}</strong> : <span key={i}>{parte}</span>,
                    )}
                  </p>
                </Fragment>
              ))}
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
