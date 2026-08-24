import Icon from '../ui/Icon.jsx';
import { useCase } from '../../context/CaseContext.jsx';
import logoLisa from '../../assets/logos/logo-lisa.png';
import logoAseguradora from '../../assets/logos/logo-aseguradora-oscuro.png';
import './LisaConsoleShell.css';

export default function LisaConsoleShell({ children }) {
  const { referencia, reiniciar } = useCase();

  return (
    <div className="lisa-console">
      <header className="lisa-console__topbar">
        <div className="lisa-console__brand">
          <img src={logoAseguradora} alt="Seguros Horizonte" className="lisa-console__brand-logo" />
          <span className="lisa-console__brand-divider" aria-hidden="true" />
          <span className="lisa-console__brand-context">Consola interna · No es una vista del cliente</span>
        </div>
        <div className="lisa-console__topbar-actions">
          <Icon nombre="bell" size={19} />
          <span className="lisa-console__ref">{referencia}</span>
        </div>
      </header>

      <div className="lisa-console__body">
        <aside className="lisa-console__sidebar">
          <div className="lisa-console__assistant">
            <img src={logoLisa} alt="LISA Terceros" className="lisa-console__assistant-logo" />
            <p className="lisa-console__assistant-name">LISA Terceros</p>
            <p className="lisa-console__assistant-tag">Motor de análisis documental</p>
          </div>

          <nav className="lisa-console__nav">
            <button type="button" className="lisa-console__nav-item lisa-console__nav-item--active">
              <Icon nombre="scan" size={18} />
              Análisis del caso
            </button>
            <button type="button" className="lisa-console__nav-item" onClick={reiniciar}>
              <Icon nombre="home" size={18} />
              Nuevo caso
            </button>
          </nav>

          <div className="lisa-console__status">
            <span className="lisa-console__status-dot" />
            Sistema en línea y preparado
          </div>
        </aside>

        <main className="lisa-console__content">{children}</main>
      </div>
    </div>
  );
}
