import './Boton.css';

export default function Boton({ children, variante = 'primario', tipo = 'button', ...resto }) {
  return (
    <button type={tipo} className={`boton boton--${variante}`} {...resto}>
      {children}
    </button>
  );
}
