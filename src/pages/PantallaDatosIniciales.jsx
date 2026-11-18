import Icon from '../components/ui/Icon.jsx';
import Boton from '../components/ui/Boton.jsx';
import Banner from '../components/ui/Banner.jsx';
import ClientShell from '../components/layout/ClientShell.jsx';
import { useCase } from '../context/CaseContext.jsx';
import './PantallaDatosIniciales.css';

export default function PantallaDatosIniciales() {
  const { formulario, actualizarFormulario, irA } = useCase();
  // Los campos vienen prellenados con el caso demo y el asegurado ya figura como encontrado.
  const manejarCambio = (campo) => (evento) => {
    const valor = evento.target.type === 'checkbox' ? evento.target.checked : evento.target.value;
    actualizarFormulario({ [campo]: valor });
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    irA('documentos');
  };

  return (
    <ClientShell>
      <div className="datos-iniciales">
        <aside className="datos-iniciales__intro">
          <p className="datos-iniciales__intro-eyebrow">Antes de empezar</p>
          <h2>Lo que vas a necesitar</h2>
          <p className="datos-iniciales__intro-lead">
            Lamentamos que hayas tenido una mala experiencia. Con estos datos ubicamos la póliza de
            la otra parte y arrancamos tu reclamo.
          </p>
          <ol className="datos-iniciales__pasos">
            <li>
              <span className="datos-iniciales__pasos-num">1</span>
              <span className="datos-iniciales__pasos-texto">
                <strong>Tu número de DNI</strong>
                <span>Para identificarte como reclamante</span>
              </span>
            </li>
            <li>
              <span className="datos-iniciales__pasos-num">2</span>
              <span className="datos-iniciales__pasos-texto">
                <strong>La patente de tu vehículo</strong>
                <span>El que participó en el siniestro</span>
              </span>
            </li>
            <li>
              <span className="datos-iniciales__pasos-num">3</span>
              <span className="datos-iniciales__pasos-texto">
                <strong>La patente del asegurado</strong>
                <span>Para ubicar su póliza en Horizonte</span>
              </span>
            </li>
          </ol>
        </aside>

        <div className="datos-iniciales__card">
          <h2>Datos Iniciales</h2>
          <p className="datos-iniciales__card-lead">
            Completá los siguientes datos para comenzar. Todos los campos son obligatorios.
          </p>

          <form className="datos-iniciales__form" onSubmit={manejarEnvio} noValidate>
            <div className="campo">
              <label htmlFor="dni">N° de DNI del reclamante</label>
              <div className={`campo__control`}>
                <input
                  id="dni"
                  name="dni"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: 20345678"
                  value={formulario.dni}
                  onChange={manejarCambio('dni')}
                />
                <Icon nombre="id" size={18} />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="nombreApellido">Nombre y apellido del conductor</label>
              <div className={`campo__control`}>
                <input
                  id="nombreApellido"
                  name="nombreApellido"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={formulario.nombreApellido}
                  onChange={manejarCambio('nombreApellido')}
                />
                <Icon nombre="user" size={18} />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="patenteReclamante">Patente de tu vehículo (tercero)</label>
              <div className={`campo__control`}>
                <input
                  id="patenteReclamante"
                  name="patenteReclamante"
                  type="text"
                  placeholder="Ej: AB123CD"
                  value={formulario.patenteReclamante}
                  onChange={manejarCambio('patenteReclamante')}
                />
                <Icon nombre="car" size={18} />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="marcaVehiculo">Marca de tu vehículo</label>
              <div className={`campo__control`}>
                <input
                  id="marcaVehiculo"
                  name="marcaVehiculo"
                  type="text"
                  placeholder="Ej: Chevrolet"
                  value={formulario.marcaVehiculo}
                  onChange={manejarCambio('marcaVehiculo')}
                />
                <Icon nombre="car" size={18} />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="fechaSiniestro">Fecha del siniestro</label>
              <div className={`campo__control`}>
                <input
                  id="fechaSiniestro"
                  name="fechaSiniestro"
                  type="date"
                  value={formulario.fechaSiniestro}
                  onChange={manejarCambio('fechaSiniestro')}
                />
                <Icon nombre="calendar" size={18} />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="localidadSiniestro">Localidad del siniestro</label>
              <div className={`campo__control`}>
                <input
                  id="localidadSiniestro"
                  name="localidadSiniestro"
                  type="text"
                  placeholder="Ej: Rosario"
                  value={formulario.localidadSiniestro}
                  onChange={manejarCambio('localidadSiniestro')}
                />
                <Icon nombre="location" size={18} />
              </div>
            </div>

            <div className="campo campo--ancho">
              <label htmlFor="patenteAsegurado">
                Patente del asegurado (compañía)
                <span className="campo__badge">Verificada</span>
              </label>
              <div
                className="campo__control campo__control--verificado"
              >
                <input
                  id="patenteAsegurado"
                  name="patenteAsegurado"
                  type="text"
                  placeholder="Ej: QWE123"
                  value={formulario.patenteAsegurado}
                  onChange={manejarCambio('patenteAsegurado')}
                />
                <Icon nombre="checkCircle" size={18} />
              </div>
            </div>

            <div className="campo campo--ancho campo--check">
              <label htmlFor="conAbogado">
                <input
                  id="conAbogado"
                  name="conAbogado"
                  type="checkbox"
                  checked={formulario.conAbogado}
                  onChange={manejarCambio('conAbogado')}
                />
                Me representa un abogado (se solicitará su carnet profesional)
              </label>
            </div>

                          <div className="campo--ancho">
                <Banner tono="exito">
                  La patente se ha encontrado con éxito, por lo que esperamos resolver el siniestro a la
                  brevedad.
                </Banner>
              </div>

            <div className="datos-iniciales__actions">
              <Boton tipo="submit">
                Comenzar Carga de Documentos
                <Icon nombre="arrowRight" size={18} />
              </Boton>
            </div>
          </form>
        </div>
      </div>
    </ClientShell>
  );
}
