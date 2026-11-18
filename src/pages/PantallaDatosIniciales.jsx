import { useState } from 'react';
import Icon from '../components/ui/Icon.jsx';
import Boton from '../components/ui/Boton.jsx';
import Banner from '../components/ui/Banner.jsx';
import ClientShell from '../components/layout/ClientShell.jsx';
import { useCase } from '../context/CaseContext.jsx';
import { datosFormulario } from '../data/mockCase.js';
import './PantallaDatosIniciales.css';

export default function PantallaDatosIniciales() {
  const { formulario, actualizarFormulario, irA } = useCase();
  const [errores, setErrores] = useState({});
  const [patenteVerificada, setPatenteVerificada] = useState(false);

  const manejarCambio = (campo) => (evento) => {
    const valor = evento.target.type === 'checkbox' ? evento.target.checked : evento.target.value;
    actualizarFormulario({ [campo]: valor });
    if (campo === 'conAbogado') return;
    if (campo === 'patenteAsegurado') {
      setPatenteVerificada(false);
      setErrores((prev) => ({ ...prev, patenteAsegurado: undefined }));
    }
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    const nuevosErrores = {};
    if (!/^\d{7,8}$/.test(formulario.dni)) {
      nuevosErrores.dni = 'Ingresá un DNI válido (7 u 8 dígitos).';
    }
    if (formulario.nombreApellido.trim().length < 3) {
      nuevosErrores.nombreApellido = 'Ingresá tu nombre y apellido.';
    }
    if (formulario.patenteReclamante.trim().length < 6) {
      nuevosErrores.patenteReclamante = 'Ingresá una patente válida.';
    }
    if (formulario.marcaVehiculo.trim().length < 2) {
      nuevosErrores.marcaVehiculo = 'Ingresá la marca de tu vehículo.';
    }
    if (!formulario.fechaSiniestro) {
      nuevosErrores.fechaSiniestro = 'Indicá la fecha del siniestro.';
    }
    if (formulario.localidadSiniestro.trim().length < 2) {
      nuevosErrores.localidadSiniestro = 'Indicá la localidad del siniestro.';
    }
    const patenteIngresada = formulario.patenteAsegurado.trim().toUpperCase().replace(/[\s-]/g, '');
    const patenteEsperada = datosFormulario.patenteAseguradoValida.replace(/[\s-]/g, '');
    if (patenteIngresada !== patenteEsperada) {
      nuevosErrores.patenteAsegurado = 'No encontramos esa patente entre nuestros asegurados.';
      setPatenteVerificada(false);
    } else {
      setPatenteVerificada(true);
    }
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) {
      irA('documentos');
    }
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
              <div className={`campo__control ${errores.dni ? 'campo__control--error' : ''}`}>
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
              {errores.dni && <span className="campo__error">{errores.dni}</span>}
            </div>

            <div className="campo">
              <label htmlFor="nombreApellido">Nombre y apellido del conductor</label>
              <div className={`campo__control ${errores.nombreApellido ? 'campo__control--error' : ''}`}>
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
              {errores.nombreApellido && <span className="campo__error">{errores.nombreApellido}</span>}
            </div>

            <div className="campo">
              <label htmlFor="patenteReclamante">Patente de tu vehículo (tercero)</label>
              <div className={`campo__control ${errores.patenteReclamante ? 'campo__control--error' : ''}`}>
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
              {errores.patenteReclamante && <span className="campo__error">{errores.patenteReclamante}</span>}
            </div>

            <div className="campo">
              <label htmlFor="marcaVehiculo">Marca de tu vehículo</label>
              <div className={`campo__control ${errores.marcaVehiculo ? 'campo__control--error' : ''}`}>
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
              {errores.marcaVehiculo && <span className="campo__error">{errores.marcaVehiculo}</span>}
            </div>

            <div className="campo">
              <label htmlFor="fechaSiniestro">Fecha del siniestro</label>
              <div className={`campo__control ${errores.fechaSiniestro ? 'campo__control--error' : ''}`}>
                <input
                  id="fechaSiniestro"
                  name="fechaSiniestro"
                  type="date"
                  value={formulario.fechaSiniestro}
                  onChange={manejarCambio('fechaSiniestro')}
                />
                <Icon nombre="calendar" size={18} />
              </div>
              {errores.fechaSiniestro && <span className="campo__error">{errores.fechaSiniestro}</span>}
            </div>

            <div className="campo">
              <label htmlFor="localidadSiniestro">Localidad del siniestro</label>
              <div className={`campo__control ${errores.localidadSiniestro ? 'campo__control--error' : ''}`}>
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
              {errores.localidadSiniestro && <span className="campo__error">{errores.localidadSiniestro}</span>}
            </div>

            <div className="campo campo--ancho">
              <label htmlFor="patenteAsegurado">
                Patente del asegurado (compañía)
                {patenteVerificada && <span className="campo__badge">Verificada</span>}
              </label>
              <div
                className={`campo__control ${errores.patenteAsegurado ? 'campo__control--error' : ''} ${
                  patenteVerificada ? 'campo__control--verificado' : ''
                }`}
              >
                <input
                  id="patenteAsegurado"
                  name="patenteAsegurado"
                  type="text"
                  placeholder="Ej: QWE123"
                  value={formulario.patenteAsegurado}
                  onChange={manejarCambio('patenteAsegurado')}
                />
                <Icon nombre={patenteVerificada ? 'checkCircle' : 'car'} size={18} />
              </div>
              {errores.patenteAsegurado && <span className="campo__error">{errores.patenteAsegurado}</span>}
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

            {patenteVerificada && (
              <div className="campo--ancho">
                <Banner tono="exito">
                  La patente se ha encontrado con éxito, por lo que esperamos resolver el siniestro a la
                  brevedad.
                </Banner>
              </div>
            )}

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
