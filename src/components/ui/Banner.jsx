import Icon from './Icon.jsx';
import './Banner.css';

const ICONO_POR_TONO = {
  exito: 'checkCircle',
  info: 'sparkle',
  alerta: 'alertCircle',
  error: 'xCircle',
};

export default function Banner({ tono = 'info', children }) {
  return (
    <div className={`banner banner--${tono}`}>
      <Icon nombre={ICONO_POR_TONO[tono]} size={20} className="banner__icon" />
      <p className="banner__text">{children}</p>
    </div>
  );
}
