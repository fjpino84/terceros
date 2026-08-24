import Icon from '../ui/Icon.jsx';
import './DocumentDropzone.css';

export default function DocumentDropzone({ documento, archivo, pendiente = false, onSeleccionar }) {
  const manejarSeleccion = (evento) => {
    const [archivoElegido] = evento.target.files;
    if (archivoElegido) {
      onSeleccionar(documento.id, archivoElegido.name);
    }
    evento.target.value = '';
  };

  const manejarSoltar = (evento) => {
    evento.preventDefault();
    const [archivoElegido] = evento.dataTransfer.files;
    if (archivoElegido) {
      onSeleccionar(documento.id, archivoElegido.name);
    }
  };

  return (
    <div className="dropzone-card">
      <div className="dropzone-card__header">
        <h3>{documento.etiqueta}</h3>
        {pendiente ? (
          <span className="dropzone-card__badge">
            <Icon nombre="alertCircle" size={13} strokeWidth={2.4} />
            Pendiente
          </span>
        ) : (
          <Icon nombre={documento.icono} size={18} className="dropzone-card__icon" />
        )}
      </div>
      <label
        className={`dropzone ${pendiente ? 'dropzone--pendiente' : archivo ? 'dropzone--lleno' : ''}`}
        onDragOver={(evento) => evento.preventDefault()}
        onDrop={manejarSoltar}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="dropzone__input"
          onChange={manejarSeleccion}
          aria-label={`Subir ${documento.etiqueta}`}
        />
        {pendiente ? (
          <>
            <Icon nombre="alertCircle" size={22} />
            <span className="dropzone__label">LISA no pudo validar este documento</span>
            <span className="dropzone__hint">Hacé clic para subir el presupuesto correcto</span>
          </>
        ) : archivo ? (
          <>
            <Icon nombre="check" size={22} strokeWidth={2.4} />
            <span className="dropzone__filename">{archivo}</span>
            <span className="dropzone__hint">Clic para reemplazar</span>
          </>
        ) : (
          <>
            <Icon nombre="upload" size={22} />
            <span className="dropzone__label">Arrastra el archivo o haz clic para subir</span>
            <span className="dropzone__hint">{documento.descripcion} · PDF, JPG, PNG (máx. 5MB)</span>
          </>
        )}
      </label>
    </div>
  );
}
