import Icon from '../ui/Icon.jsx';
import { PASOS, useCase } from '../../context/CaseContext.jsx';
import logoClaro from '../../assets/logos/logo-aseguradora-claro.png';
import logoOscuro from '../../assets/logos/logo-aseguradora-oscuro.png';
import logoLisa from '../../assets/logos/logo-lisa.png';
import './ClientShell.css';

const PASO_ACTIVO_POR_PANTALLA = {
  datos: 'datos',
  documentos: 'documentos',
  resultadoExito: 'resultado',
  resultadoRechazo: 'resultado',
};

const ENLACES_MENU = ['Inicio', 'Seguros', 'Siniestros', 'Contacto'];

export default function ClientShell({ children }) {
  const { pantalla, referencia } = useCase();
  const pasoActivoId = PASO_ACTIVO_POR_PANTALLA[pantalla] ?? 'datos';
  const indiceActivo = PASOS.findIndex((paso) => paso.id === pasoActivoId);

  return (
    <div className="client-shell">
      <header className="client-shell__topbar">
        <div className="client-shell__brand">
          <img src={logoClaro} alt="Seguros Horizonte" className="client-shell__brand-logo" />
        </div>

        <nav className="client-shell__menu" aria-label="Navegación principal">
          {ENLACES_MENU.map((enlace, indice) => (
            <a key={enlace} href="#inicio" className={indice === 2 ? 'client-shell__menu-link--activo' : ''}>
              {enlace}
            </a>
          ))}
        </nav>

        <div className="client-shell__topbar-actions">
          {referencia && <span className="client-shell__ref">Ref. {referencia}</span>}
          <button type="button" className="client-shell__icon-btn" aria-label="Cambiar idioma">
            <Icon nombre="globe" size={20} />
          </button>
        </div>
      </header>

      <div className="client-shell__banner">
        <div className="client-shell__banner-inner">
          <div className="client-shell__banner-heading">
            <img src={logoOscuro} alt="Seguros Horizonte" className="client-shell__banner-logo" />
            <div>
              <span className="client-shell__banner-eyebrow">Portal de denuncias para terceros</span>
              <h1>Iniciá tu reclamo de forma simple y segura</h1>
            </div>
          </div>

          <nav className="client-shell__stepper" aria-label="Progreso de la denuncia">
            <ol>
              {PASOS.map((paso, indice) => {
                const estado =
                  indice < indiceActivo ? 'completado' : indice === indiceActivo ? 'activo' : 'pendiente';
                return (
                  <li key={paso.id} className={`client-shell__step client-shell__step--${estado}`}>
                    <span className="client-shell__step-marker">
                      {estado === 'completado' ? (
                        <Icon nombre="check" size={13} strokeWidth={2.6} />
                      ) : (
                        indice + 1
                      )}
                    </span>
                    <span className="client-shell__step-label">{paso.etiqueta}</span>
                    {indice < PASOS.length - 1 && (
                      <span className="client-shell__step-line" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>

      <main className="client-shell__content">{children}</main>

      <footer className="client-shell__footer">
        <div className="client-shell__footer-inner">
          <span className="client-shell__footer-copy">© 2026 Seguros Horizonte. Todos los derechos reservados.</span>
          <div className="client-shell__footer-powered">
            <span>Powered by</span>
            <img src={logoLisa} alt="LISA Insurtech" className="client-shell__footer-lisa-logo" />
            <strong>LISA Insurtech</strong>
          </div>
          <nav className="client-shell__footer-links">
            <a href="#terminos">Términos y Condiciones</a>
            <a href="#privacidad">Privacidad</a>
            <a href="#ayuda">Centro de Ayuda</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
