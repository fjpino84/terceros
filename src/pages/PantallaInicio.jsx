import Icon from '../components/ui/Icon.jsx';
import { useCase } from '../context/CaseContext.jsx';
import logoAseguradora from '../assets/logos/logo-aseguradora-claro.png';
import logoLisa from '../assets/logos/logo-lisa.png';
import './PantallaInicio.css';

export default function PantallaInicio() {
  const { iniciarEscenario } = useCase();

  return (
    <div className="inicio">
      <div className="inicio__panel">
        <div className="inicio__brands">
          <img src={logoAseguradora} alt="Seguros Horizonte" className="inicio__brand-logo" />
          <span className="inicio__brand-x">×</span>
          <img src={logoLisa} alt="LISA vigIA" className="inicio__brand-logo inicio__brand-logo--lisa" />
        </div>
        <p className="inicio__eyebrow">Demo de producto</p>
        <h1 className="inicio__title">Portal de Denuncias para Terceros</h1>
        <p className="inicio__lead">
          Simulación del flujo end-to-end: el tercero carga sus datos y documentos, LISA vigIA los analiza
          en tiempo real, y el caso se resuelve automáticamente. Elegí un escenario para ver el recorrido
          completo.
        </p>

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
