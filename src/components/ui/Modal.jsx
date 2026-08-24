import Icon from './Icon.jsx';
import './Modal.css';

export default function Modal({ tono = 'alerta', titulo, children, acciones }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
      <div className={`modal modal--${tono}`}>
        <span className="modal__icon">
          <Icon nombre={tono === 'error' ? 'xCircle' : 'alertCircle'} size={28} />
        </span>
        <h2 id="modal-titulo" className="modal__title">
          {titulo}
        </h2>
        <div className="modal__body">{children}</div>
        <div className="modal__actions">{acciones}</div>
      </div>
    </div>
  );
}
