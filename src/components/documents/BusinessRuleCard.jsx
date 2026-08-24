import Icon from '../ui/Icon.jsx';
import './BusinessRuleCard.css';

export default function BusinessRuleCard({ regla, fase }) {
  const estadoVisual = fase ?? 'pendiente';
  const analizando = estadoVisual === 'analizando';
  const resuelto = estadoVisual === regla.estado;

  return (
    <div className={`rule-card rule-card--${estadoVisual} ${resuelto || analizando ? 'rule-card--activa' : ''}`}>
      <span className="rule-card__icon">
        {analizando ? <span className="rule-card__spinner" aria-hidden="true" /> : <Icon nombre={regla.icono} size={18} />}
      </span>
      <div>
        <p className="rule-card__title">{regla.titulo}</p>
        <p className="rule-card__detail">
          {analizando ? 'Verificando…' : resuelto ? regla.detalle : 'En cola de verificación'}
        </p>
      </div>
    </div>
  );
}
