import { useState } from 'react';
import Icon from '../components/ui/Icon.jsx';
import Boton from '../components/ui/Boton.jsx';
import ClientShell from '../components/layout/ClientShell.jsx';
import { useCase } from '../context/CaseContext.jsx';
import './PantallaResultado.css';

const CARAS = [
  { id: 'feliz', emoji: '😀', etiqueta: 'Muy satisfecho', color: 'var(--success-strong)' },
  { id: 'neutral', emoji: '😐', etiqueta: 'Neutral', color: '#b8860a' },
  { id: 'triste', emoji: '😞', etiqueta: 'Insatisfecho', color: 'var(--danger-strong)' },
];

export default function PantallaResultadoExito() {
  const { referencia, reiniciar } = useCase();
  const [valoracion, setValoracion] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const manejarEnvioEncuesta = (evento) => {
    evento.preventDefault();
    if (valoracion) {
      setEnviado(true);
    }
  };

  return (
    <ClientShell>
      <div className="resultado resultado--exito">
        <div className="resultado__principal">
          <div className="resultado__card">
            <span className="resultado__icon resultado__icon--exito">
              <Icon nombre="checkCircle" size={30} />
            </span>
            <h1>¡Recibimos todos tus documentos!</h1>
            <p className="resultado__lead">
              Hemos recibido y validado toda tu documentación correctamente. En las próximas{' '}
              <strong>24 horas</strong> te contactaremos para informarte el monto aprobado y el plazo de
              pago del siniestro.
            </p>
            <div className="resultado__ref">
              <span>N° de referencia</span>
              <strong>{referencia}</strong>
            </div>
            <button type="button" className="resultado__reiniciar" onClick={reiniciar}>
              <Icon nombre="home" size={15} /> Volver al inicio de la demo
            </button>
          </div>

          <a className="promo" href="#cotizar">
            <div className="promo__text">
              <p className="promo__eyebrow">Seguros Horizonte</p>
              <h3>¿Sabías que también podés asegurar tu auto con nosotros?</h3>
              <p>Cotizá en 3 minutos y sumate a los conductores que ya eligieron Horizonte.</p>
            </div>
            <span className="promo__cta">
              Cotizar mi seguro
              <Icon nombre="arrowRight" size={17} />
            </span>
          </a>
        </div>

        <div className="encuesta">
          {!enviado ? (
            <form onSubmit={manejarEnvioEncuesta}>
              <h2>¿Cómo fue tu experiencia con este proceso?</h2>
              <div className="encuesta__caras">
                {CARAS.map((cara) => (
                  <button
                    type="button"
                    key={cara.id}
                    className={`encuesta__cara ${valoracion === cara.id ? 'encuesta__cara--activa' : ''}`}
                    style={{ '--cara-color': cara.color }}
                    onClick={() => setValoracion(cara.id)}
                    aria-pressed={valoracion === cara.id}
                  >
                    <span className="encuesta__emoji" aria-hidden="true">{cara.emoji}</span>
                    <span className="encuesta__etiqueta">{cara.etiqueta}</span>
                  </button>
                ))}
              </div>
              <Boton tipo="submit" variante="secundario" disabled={!valoracion}>
                Enviar evaluación
              </Boton>
            </form>
          ) : (
            <p className="encuesta__gracias">
              <Icon nombre="checkCircle" size={20} /> ¡Gracias por tu evaluación! Nos ayuda a mejorar.
            </p>
          )}
        </div>
      </div>
    </ClientShell>
  );
}
