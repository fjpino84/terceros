// Datos simulados del mockup. Replican la presentación
// "Validación de Alertas Técnicas — Mercantil Andina × LISA Claims" (RC Auto Argentina).
//
// Lógica de la presentación: la IA lee cada documento y el motor de decisión cruza lo leído con los
// campos que entrega el API de la iniciativa. Cada documento termina "Aprobado" o "Rechazado".
//   - Regla incumplida (rechazo): documento "Rechazado" y marcado como "No Aportado", se actualiza el
//     estado de la iniciativa y se solicita el reaporte.
//   - Regla incumplida (alerta): el documento se aprueba, pero se informa un mensaje de alerta.
// Declaración Jurada de No-Seguro, Contrato de Compraventa y Formulario 08 no tienen modelo de IA
// entrenado ni reglas de negocio, por eso no forman parte de este flujo.

// Valores que "entrega el API" con la iniciativa. Los completa el tercero en el formulario inicial.
export const datosApi = {
  dni: '20345678',
  nombreApellido: 'Juan Pérez',
  dominioTercero: 'ABC-123',
  dominioAsegurado: 'QWE123',
  marcaTercero: 'Chevrolet',
  fechaSiniestro: '05/11/2026',
  localidadSiniestro: 'Rosario',
};

export const datosFormulario = {
  patenteAseguradoValida: 'QWE123',
};

// Parámetros numéricos de las reglas (diapositivas 3 a 10).
export const parametrosReglas = {
  matchMinimoPatente: 80,
  matchMinimoNombre: 80,
  toleranciaFechaDias: 3,
  ventanaVigenteAFechaDias: 2,
  toleranciaLicenciaDias: 90,
  largoMinimoRelato: 5,
};

const DOCUMENTOS = [
  {
    id: 'cedula',
    etiqueta: 'Cédula verde / azul',
    descripcion: 'Cédula de identificación del vehículo del tercero',
    icono: 'car',
    archivo: 'titulo.png',
  },
  {
    id: 'dni',
    etiqueta: 'DNI',
    descripcion: 'Documento nacional de identidad del reclamante',
    icono: 'id',
    archivo: 'dni.png',
  },
  {
    id: 'licencia',
    etiqueta: 'Licencia de conducir',
    descripcion: 'Licencia del conductor del vehículo tercero',
    icono: 'license',
    archivo: 'licencia.png',
  },
  {
    id: 'denuncia',
    etiqueta: 'Denuncia administrativa',
    descripcion: 'Denuncia presentada ante la aseguradora del tercero',
    icono: 'doc',
    archivo: 'poliza.png',
  },
  {
    id: 'certificado',
    etiqueta: 'Certificado de cobertura',
    descripcion: 'Certificado emitido por la aseguradora del tercero',
    icono: 'shield',
    archivo: 'poliza.png',
  },
  {
    id: 'franquicia',
    etiqueta: 'Carta franquicia',
    descripcion: 'Carta de la aseguradora con monto de reparación y franquicia (cobertura Todo Riesgo)',
    icono: 'invoice',
    archivo: null,
  },
  {
    id: 'factura',
    etiqueta: 'Factura de reparación',
    descripcion: 'Factura del taller con su fecha de emisión',
    icono: 'invoice',
    archivo: null,
  },
  {
    id: 'carnet',
    etiqueta: 'Carnet de abogado',
    descripcion: 'Credencial del abogado que representa al reclamante',
    icono: 'id',
    archivo: null,
    soloConAbogado: true,
  },
];

// Documentos que se solicitan según los datos del formulario (el carnet solo si hay abogado).
export const obtenerDocumentos = (conAbogado) =>
  DOCUMENTOS.filter((documento) => !documento.soloConAbogado || conAbogado);

// ---------------------------------------------------------------------------------------------
// Primer proceso: lectura de la IA por documento (campos tal como los define la presentación).
// ---------------------------------------------------------------------------------------------

export const lecturaExito = {
  cedula: {
    estado: 'ok',
    titulo: 'Cédula identificada',
    campos: [
      { etiqueta: 'Dominio', valor: 'ABC-123' },
      { etiqueta: 'Marca', valor: 'Chevrolet' },
    ],
  },
  dni: {
    estado: 'ok',
    titulo: 'DNI identificado',
    campos: [{ etiqueta: 'DNI', valor: '20.345.678' }],
  },
  licencia: {
    estado: 'ok',
    titulo: 'Licencia de conducir identificada',
    campos: [
      { etiqueta: 'Apellido y nombre', valor: 'Pérez, Juan' },
      { etiqueta: 'Vencimiento', valor: '12/05/2028' },
    ],
  },
  denuncia: {
    estado: 'ok',
    titulo: 'Denuncia administrativa identificada',
    campos: [
      { etiqueta: 'Fecha de ocurrencia', valor: '04/11/2026' },
      { etiqueta: 'Dominio del tercero', valor: 'ABC-123' },
      { etiqueta: 'Dominio del asegurado', valor: 'QWE123' },
      { etiqueta: 'Localidad', valor: 'Rosario' },
      { etiqueta: 'Relato', valor: 'Colisión en intersección, daños en lateral' },
    ],
  },
  certificado: {
    estado: 'ok',
    titulo: 'Certificado de cobertura identificado',
    campos: [
      { etiqueta: 'Vigencia', valor: '01/03/2026 al 01/03/2027' },
      { etiqueta: 'Dominio del tercero', valor: 'ABC-123' },
      { etiqueta: 'Cobertura', valor: 'Todo Riesgo' },
      { etiqueta: 'Palabra "Franquicia"', valor: 'Presente' },
    ],
  },
  franquicia: {
    estado: 'ok',
    titulo: 'Carta franquicia identificada',
    campos: [
      { etiqueta: 'Fecha del siniestro', valor: '05/11/2026' },
      { etiqueta: 'Dominio', valor: 'ABC-123' },
      { etiqueta: 'Monto de reparación', valor: '$1.464.620' },
      { etiqueta: 'Monto de franquicia', valor: '$673.200' },
    ],
  },
  factura: {
    estado: 'ok',
    titulo: 'Factura de reparación identificada',
    campos: [
      { etiqueta: 'Fecha de emisión', valor: '12/11/2026' },
      { etiqueta: 'Total', valor: '$150.000' },
    ],
  },
  carnet: {
    estado: 'ok',
    titulo: 'Carnet de abogado identificado',
    campos: [
      { etiqueta: 'Emisor', valor: 'Colegio Público de Abogados de la Capital Federal' },
      { etiqueta: 'Vencimiento', valor: '15/08/2029' },
    ],
  },
};

// Caso de RECHAZO: licencia vencida, factura anterior al siniestro y marca distinta (aprobada con alerta).
export const lecturaRechazo = {
  ...lecturaExito,
  cedula: {
    estado: 'alerta',
    titulo: 'Cédula aprobada con alerta',
    campos: [
      { etiqueta: 'Dominio', valor: 'ABC-123' },
      { etiqueta: 'Marca', valor: 'Chevrolet' },
      { etiqueta: 'Alerta', valor: 'La marca difiere de la informada en el API' },
    ],
  },
  licencia: {
    estado: 'error',
    titulo: 'Licencia rechazada — vencida',
    campos: [
      { etiqueta: 'Apellido y nombre', valor: 'Pérez, Juan' },
      { etiqueta: 'Vencimiento', valor: '12/05/2026 (177 días antes del siniestro)' },
      { etiqueta: 'Acción', valor: 'Marcada como "No Aportado"' },
    ],
  },
  factura: {
    estado: 'error',
    titulo: 'Factura rechazada — emitida antes del siniestro',
    campos: [
      { etiqueta: 'Fecha de emisión', valor: '28/10/2026' },
      { etiqueta: 'Total', valor: '$150.000' },
      { etiqueta: 'Acción', valor: 'Marcada como "No Aportado"' },
    ],
  },
  carnet: {
    estado: 'alerta',
    titulo: 'Carnet aprobado con alerta',
    campos: [
      { etiqueta: 'Emisor', valor: 'Colegio Público de Abogados de la Capital Federal' },
      { etiqueta: 'Vencimiento', valor: '15/08/2026' },
      { etiqueta: 'Alerta', valor: 'Vencido a la fecha del siniestro' },
    ],
  },
};

// ---------------------------------------------------------------------------------------------
// Segundo proceso: reglas por documento, cruzando lo leído por la IA contra los valores del API.
// ---------------------------------------------------------------------------------------------

export const reglasNegocioExito = [
  {
    id: 'cedula-patente',
    documento: 'cedula',
    icono: 'car',
    titulo: 'Cédula · Coincidencia de patente',
    detalle: 'Match 100% entre ABC-123 (IA) y el dominio del tercero en el API. Mínimo exigido: 80%.',
    estado: 'ok',
  },
  {
    id: 'cedula-marca',
    documento: 'cedula',
    icono: 'match',
    titulo: 'Cédula · Validación de marca',
    detalle: 'La marca leída (Chevrolet) coincide con la marca del vehículo tercero en el API.',
    estado: 'ok',
  },
  {
    id: 'dni-numero',
    documento: 'dni',
    icono: 'id',
    titulo: 'DNI · Número de documento',
    detalle: 'El DNI leído (20.345.678) coincide con el valor de entrada entregado en el API.',
    estado: 'ok',
  },
  {
    id: 'licencia-vencimiento',
    documento: 'licencia',
    icono: 'calendar',
    titulo: 'Licencia · Vencimiento',
    detalle: 'Vence el 12/05/2028, posterior al siniestro. Tolerancia máxima de vencida: 90 días.',
    estado: 'ok',
  },
  {
    id: 'licencia-conductor',
    documento: 'licencia',
    icono: 'user',
    titulo: 'Licencia · Datos del conductor',
    detalle: 'Apellido y nombre con match sobre el 80% exigido frente al campo del API.',
    estado: 'ok',
  },
  {
    id: 'denuncia-fecha',
    documento: 'denuncia',
    icono: 'calendar',
    titulo: 'Denuncia · Fecha de ocurrencia',
    detalle: 'La fecha leída (04/11/2026) está dentro de ±3 días de la del siniestro en el API (05/11/2026).',
    estado: 'ok',
  },
  {
    id: 'denuncia-tercero',
    documento: 'denuncia',
    icono: 'car',
    titulo: 'Denuncia · Patente del tercero',
    detalle: 'Match 100% con el dominio del tercero en el API (mínimo 80%).',
    estado: 'ok',
  },
  {
    id: 'denuncia-asegurado',
    documento: 'denuncia',
    icono: 'shield',
    titulo: 'Denuncia · Patente del asegurado',
    detalle: 'Match 100% con el dominio del asegurado en el API (mínimo 80%).',
    estado: 'ok',
  },
  {
    id: 'denuncia-localidad',
    documento: 'denuncia',
    icono: 'location',
    titulo: 'Denuncia · Localidad del siniestro',
    detalle: 'Coincidencia 100% entre la localidad leída (Rosario) y la informada en el API.',
    estado: 'ok',
  },
  {
    id: 'denuncia-relato',
    documento: 'denuncia',
    icono: 'doc',
    titulo: 'Denuncia · Relato del siniestro',
    detalle: 'El relato supera los 5 caracteres y no contiene la frase "adjunto denuncia".',
    estado: 'ok',
  },
  {
    id: 'certificado-vigencia',
    documento: 'certificado',
    icono: 'calendar',
    titulo: 'Certificado · Vigencia de póliza',
    detalle: 'El siniestro (05/11/2026) está dentro de la vigencia, del 01/03/2026 al 01/03/2027.',
    estado: 'ok',
  },
  {
    id: 'certificado-patente',
    documento: 'certificado',
    icono: 'car',
    titulo: 'Certificado · Patente del tercero',
    detalle: 'Match 100% con el dominio del tercero en el API (mínimo 80%).',
    estado: 'ok',
  },
  {
    id: 'certificado-todo-riesgo',
    documento: 'certificado',
    icono: 'scan',
    titulo: 'Certificado · Todo Riesgo',
    detalle: 'Cobertura Todo Riesgo: el documento contiene la palabra "Franquicia".',
    estado: 'ok',
  },
  {
    id: 'franquicia-fecha',
    documento: 'franquicia',
    icono: 'calendar',
    titulo: 'Carta franquicia · Fecha del siniestro',
    detalle: 'La fecha leída (05/11/2026) coincide dentro de ±3 días con el API.',
    estado: 'ok',
  },
  {
    id: 'franquicia-patente',
    documento: 'franquicia',
    icono: 'car',
    titulo: 'Carta franquicia · Patente vehicular',
    detalle: 'Match 100% con el dominio del tercero en el API (mínimo 80%).',
    estado: 'ok',
  },
  {
    id: 'franquicia-montos',
    documento: 'franquicia',
    icono: 'invoice',
    titulo: 'Carta franquicia · Montos',
    detalle: 'Presentes el monto de reparación ($1.464.620) y el monto de franquicia ($673.200).',
    estado: 'ok',
  },
  {
    id: 'factura-fecha',
    documento: 'factura',
    icono: 'invoice',
    titulo: 'Factura · Fecha de emisión',
    detalle: 'Emitida el 12/11/2026, posterior a la fecha de ocurrencia del siniestro.',
    estado: 'ok',
  },
  {
    id: 'carnet-vencimiento',
    documento: 'carnet',
    icono: 'id',
    titulo: 'Carnet · Vencimiento',
    detalle: 'Emitido por el Colegio Público de Abogados de la Capital Federal y vence el 15/08/2029.',
    estado: 'ok',
  },
];

const CAMBIOS_RECHAZO = {
  'cedula-marca': {
    detalle:
      'La marca leída (Chevrolet) no coincide con la del API (Volkswagen). Se aprueba el documento con mensaje de alerta.',
    estado: 'alerta',
  },
  'licencia-vencimiento': {
    detalle:
      'Venció el 12/05/2026, 177 días antes del siniestro (máximo 90). Rechazada y marcada como "No Aportado".',
    estado: 'error',
  },
  'factura-fecha': {
    detalle:
      'Emitida el 28/10/2026, anterior al siniestro (05/11/2026). Rechazo inmediato por posible fraude post-siniestro.',
    estado: 'error',
  },
  'carnet-vencimiento': {
    detalle: 'El carnet venció el 15/08/2026, antes del siniestro. Se aprueba el documento con mensaje de alerta.',
    estado: 'alerta',
  },
};

export const reglasNegocioRechazo = reglasNegocioExito.map((regla) => ({
  ...regla,
  ...(CAMBIOS_RECHAZO[regla.id] ?? {}),
}));

// Documentos que el motor marca como "No Aportado" en el caso de rechazo (acciones de control).
export const documentosNoAportados = ['Licencia de conducir', 'Factura de reparación'];
