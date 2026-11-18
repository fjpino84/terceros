import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CaseContext = createContext(null);

const CLAVE_ALMACENAMIENTO = 'lisa-vigia:caso';

export const PASOS = [
  { id: 'datos', etiqueta: 'Datos Iniciales' },
  { id: 'documentos', etiqueta: 'Documentos' },
  { id: 'resultado', etiqueta: 'Resultados' },
];

// Datos del caso demo: el formulario inicial arranca prellenado.
const FORMULARIO_PRELLENADO = {
  dni: '20345678',
  nombreApellido: 'Juan Pérez',
  patenteReclamante: 'ABC-123',
  marcaVehiculo: 'Chevrolet',
  patenteAsegurado: 'QWE123',
  fechaSiniestro: '2026-11-05',
  localidadSiniestro: 'Rosario',
  conAbogado: false,
};

const ESTADO_INICIAL = {
  pantalla: 'inicio',
  escenario: null,
  referencia: null,
  formulario: FORMULARIO_PRELLENADO,
  documentosSubidos: {},
  facturaPendiente: false,
  facturaValidada: false,
};

const generarReferencia = () => {
  const bloque = () => Math.floor(1000 + Math.random() * 9000);
  return `LISA-${bloque()}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
};

const cargarEstadoGuardado = () => {
  try {
    const guardado = window.localStorage.getItem(CLAVE_ALMACENAMIENTO);
    if (!guardado) return ESTADO_INICIAL;
    const parseado = JSON.parse(guardado);
    return {
      ...ESTADO_INICIAL,
      ...parseado,
      formulario: { ...ESTADO_INICIAL.formulario, ...parseado.formulario },
    };
  } catch {
    return ESTADO_INICIAL;
  }
};

export function CaseProvider({ children }) {
  const [estado, setEstado] = useState(cargarEstadoGuardado);

  useEffect(() => {
    try {
      window.localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(estado));
    } catch {
      // Almacenamiento no disponible (modo privado, cuota excedida, etc.): se ignora.
    }
  }, [estado]);

  const valor = useMemo(
    () => ({
      ...estado,
      irA: (pantalla) => setEstado((prev) => ({ ...prev, pantalla })),
      iniciarEscenario: (escenario) =>
        setEstado((prev) => ({
          ...prev,
          escenario,
          referencia: generarReferencia(),
          pantalla: 'datos',
          formulario: FORMULARIO_PRELLENADO,
          documentosSubidos: {},
          facturaPendiente: false,
          facturaValidada: false,
        })),
      actualizarFormulario: (campos) =>
        setEstado((prev) => ({ ...prev, formulario: { ...prev.formulario, ...campos } })),
      marcarDocumentoSubido: (id, archivo) =>
        setEstado((prev) => ({
          ...prev,
          documentosSubidos: { ...prev.documentosSubidos, [id]: archivo },
        })),
      marcarFacturaPendiente: () =>
        setEstado((prev) => ({
          ...prev,
          facturaPendiente: true,
          documentosSubidos: { ...prev.documentosSubidos, factura: null },
          pantalla: 'documentos',
        })),
      resolverFacturaPendiente: (archivo) =>
        setEstado((prev) => ({
          ...prev,
          facturaPendiente: false,
          facturaValidada: true,
          documentosSubidos: { ...prev.documentosSubidos, factura: archivo },
          pantalla: 'analisis',
        })),
      reiniciar: () => {
        try {
          window.localStorage.removeItem(CLAVE_ALMACENAMIENTO);
        } catch {
          // Almacenamiento no disponible: se ignora.
        }
        setEstado(ESTADO_INICIAL);
      },
    }),
    [estado],
  );

  return <CaseContext.Provider value={valor}>{children}</CaseContext.Provider>;
}

export function useCase() {
  const contexto = useContext(CaseContext);
  if (!contexto) {
    throw new Error('useCase debe usarse dentro de CaseProvider');
  }
  return contexto;
}
