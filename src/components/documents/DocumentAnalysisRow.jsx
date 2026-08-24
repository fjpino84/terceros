import Icon from '../ui/Icon.jsx';
import './DocumentAnalysisRow.css';

const IMAGENES = import.meta.glob('../../assets/docs/*.png', { eager: true, import: 'default' });

const obtenerImagen = (archivo) => {
  if (!archivo) return null;
  const entrada = Object.entries(IMAGENES).find(([ruta]) => ruta.endsWith(`/${archivo}`));
  return entrada ? entrada[1] : null;
};

const ESTILO_POR_FASE = {
  pendiente: { icono: null, clase: 'fase--pendiente' },
  analizando: { icono: 'scan', clase: 'fase--analizando' },
  ok: { icono: 'checkCircle', clase: 'fase--ok' },
  alerta: { icono: 'alertCircle', clase: 'fase--alerta' },
  error: { icono: 'xCircle', clase: 'fase--error' },
};

const ETIQUETA_POR_FASE = {
  analizando: 'Analizando…',
  ok: 'Validado',
  alerta: 'Atención',
  error: 'Rechazado',
};

export default function DocumentAnalysisRow({ documento, archivoMostrado, fase, lectura }) {
  const imagen = obtenerImagen(archivoMostrado);
  const estilo = ESTILO_POR_FASE[fase] ?? ESTILO_POR_FASE.pendiente;

  return (
    <div className={`analysis-row ${estilo.clase}`}>
      <div className="analysis-row__thumb">
        {imagen ? (
          <img src={imagen} alt={documento.etiqueta} />
        ) : (
          <div className="analysis-row__thumb-placeholder">
            <Icon nombre={documento.icono} size={20} />
          </div>
        )}
        {fase === 'analizando' && <span className="analysis-row__scanline" aria-hidden="true" />}
      </div>

      <div className="analysis-row__body">
        <span className="analysis-row__label">{documento.etiqueta}</span>

        {lectura ? (
          <dl className="analysis-row__fields">
            {lectura.campos.map((campo) => (
              <div key={campo.etiqueta} className="analysis-row__field">
                <dt>{campo.etiqueta}:</dt>
                <dd>{campo.valor}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="analysis-row__waiting">
            {fase === 'analizando' ? 'Leyendo documento con OCR…' : 'En espera de análisis'}
          </p>
        )}
      </div>

      {estilo.icono && (
        <span className={`analysis-row__badge analysis-row__badge--${fase}`}>
          <Icon nombre={estilo.icono} size={13} strokeWidth={2.4} />
          {ETIQUETA_POR_FASE[fase]}
        </span>
      )}
    </div>
  );
}
