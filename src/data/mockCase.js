// Datos simulados extraídos de los documentos falsos provistos en /Docs.
// Se usan dos variantes del caso: éxito (vigente) y rechazo (fraude / licencia vencida).

export const datosFormulario = {
  dniReclamante: '20345678',
  patenteReclamante: 'ABC-123',
  patenteAseguradoValida: 'QWE123',
};

export const documentosBase = [
  {
    id: 'cedula',
    etiqueta: 'Cédula / Título',
    descripcion: 'Cédula verde o título del vehículo del reclamante',
    icono: 'car',
    archivo: 'titulo.png',
    obligatorio: true,
  },
  {
    id: 'dni',
    etiqueta: 'DNI',
    descripcion: 'Frente y dorso del documento del reclamante',
    icono: 'id',
    archivo: 'dni.png',
    obligatorio: true,
  },
  {
    id: 'licencia',
    etiqueta: 'Licencia de conducir',
    descripcion: 'Licencia vigente al momento del siniestro',
    icono: 'license',
    archivo: 'licencia.png',
    obligatorio: true,
  },
  {
    id: 'denuncia',
    etiqueta: 'Denuncia y certificado de cobertura',
    descripcion: 'Documentación emitida por tu aseguradora',
    icono: 'doc',
    archivo: 'poliza.png',
    obligatorio: true,
  },
  {
    id: 'presupuesto',
    etiqueta: 'Presupuestos y facturas',
    descripcion: 'Presupuesto de reparación del taller',
    icono: 'invoice',
    archivo: null,
    obligatorio: true,
  },
];

// Lecturas simuladas de LISA por documento, para el caso EXITOSO.
export const lecturaExito = {
  cedula: {
    estado: 'ok',
    titulo: 'Cédula verde identificada',
    campos: [
      { etiqueta: 'Patente', valor: 'ABC-123' },
      { etiqueta: 'Marca / Modelo', valor: 'Chevrolet Cruze' },
      { etiqueta: 'Titular', valor: 'Juan Pérez' },
    ],
  },
  dni: {
    estado: 'ok',
    titulo: 'DNI identificado y validado',
    campos: [
      { etiqueta: 'Nombre', valor: 'Juan Pérez' },
      { etiqueta: 'N° Documento', valor: '20.345.678' },
      { etiqueta: 'Match biométrico', valor: 'Consistente' },
    ],
  },
  licencia: {
    estado: 'ok',
    titulo: 'Licencia de conducir identificada',
    campos: [
      { etiqueta: 'Titular', valor: 'García, Juan Carlos' },
      { etiqueta: 'Clase', valor: 'B1 / E62' },
      { etiqueta: 'Vigencia', valor: '12/05/2027 — Vigente' },
    ],
  },
  denuncia: {
    estado: 'ok',
    titulo: 'Denuncia y cobertura identificadas',
    campos: [
      { etiqueta: 'N° Póliza', valor: '12345-AB' },
      { etiqueta: 'Cobertura', valor: 'Vigente al momento del siniestro' },
      { etiqueta: 'Fecha denuncia', valor: '25/12/2025' },
    ],
  },
  presupuesto: {
    estado: 'ok',
    titulo: 'Presupuesto validado',
    campos: [
      { etiqueta: 'Taller', valor: 'Talleres Mecánicos S.L.' },
      { etiqueta: 'Fecha', valor: '15/05/2024' },
      { etiqueta: 'Ítems', valor: '4 (frenos, filtro, insumos, mano de obra)' },
      { etiqueta: 'Total', valor: '$150.000' },
    ],
  },
};

// Lecturas simuladas para el caso de RECHAZO (licencia vencida + fraude en presupuesto).
export const lecturaRechazo = {
  cedula: {
    estado: 'ok',
    titulo: 'Cédula verde identificada',
    campos: [
      { etiqueta: 'Patente', valor: 'ABC-123' },
      { etiqueta: 'Marca / Modelo', valor: 'Chevrolet Cruze' },
      { etiqueta: 'Titular', valor: 'Juan Pérez' },
    ],
  },
  dni: {
    estado: 'ok',
    titulo: 'DNI identificado y validado',
    campos: [
      { etiqueta: 'Nombre', valor: 'Juan Pérez' },
      { etiqueta: 'N° Documento', valor: '20.345.678' },
      { etiqueta: 'Match biométrico', valor: 'Consistente' },
    ],
  },
  licencia: {
    estado: 'alerta',
    titulo: 'Licencia identificada — vencida',
    campos: [
      { etiqueta: 'Titular', valor: 'García, Juan Carlos' },
      { etiqueta: 'Clase', valor: 'B1 / E62' },
      { etiqueta: 'Vigencia', valor: '12/05/2023 — Vencida' },
    ],
  },
  denuncia: {
    estado: 'ok',
    titulo: 'Denuncia y cobertura identificadas',
    campos: [
      { etiqueta: 'N° Póliza', valor: '12345-AB' },
      { etiqueta: 'Cobertura', valor: 'Vigente al momento del siniestro' },
      { etiqueta: 'Fecha denuncia', valor: '25/12/2025' },
    ],
  },
  presupuesto: {
    estado: 'error',
    titulo: 'Presupuesto — inconsistencia detectada',
    campos: [
      { etiqueta: 'Taller', valor: 'Talleres Mecánicos S.L.' },
      { etiqueta: 'Fecha declarada', valor: '15/05/2024' },
      { etiqueta: 'Total declarado', valor: '$150.000' },
      { etiqueta: 'Hallazgo', valor: 'Monto y fecha adulterados' },
    ],
  },
};

export const reglasNegocioExito = [
  {
    id: 'patente',
    icono: 'match',
    titulo: 'Coincidencia de patente',
    detalle: 'El dominio declarado en el formulario (ABC-123) coincide con el de la cédula.',
    estado: 'ok',
  },
  {
    id: 'vigencia',
    icono: 'calendar',
    titulo: 'Validez temporal',
    detalle: 'La licencia y la cobertura están vigentes al momento del siniestro (tolerancia ±3 días).',
    estado: 'ok',
  },
  {
    id: 'titularidad',
    icono: 'user',
    titulo: 'Validación de titularidad',
    detalle: 'El reclamante es titular del vehículo según cédula y DNI.',
    estado: 'ok',
  },
  {
    id: 'declaracion',
    icono: 'shield',
    titulo: 'Declaración jurada',
    detalle: 'Se detectó la frase "no poseer seguro vigente" en la denuncia. Aceptada.',
    estado: 'ok',
  },
  {
    id: 'integridad',
    icono: 'scan',
    titulo: 'Integridad documental',
    detalle: 'Sin duplicados ni indicios de adulteración en los documentos provistos.',
    estado: 'ok',
  },
];

export const reglasNegocioRechazo = [
  {
    id: 'patente',
    icono: 'match',
    titulo: 'Coincidencia de patente',
    detalle: 'El dominio declarado en el formulario (ABC-123) coincide con el de la cédula.',
    estado: 'ok',
  },
  {
    id: 'vigencia',
    icono: 'calendar',
    titulo: 'Validez temporal',
    detalle: 'La licencia venció el 12/05/2023, previo a la fecha del siniestro. No se puede proceder.',
    estado: 'error',
  },
  {
    id: 'titularidad',
    icono: 'user',
    titulo: 'Validación de titularidad',
    detalle: 'El reclamante es titular del vehículo según cédula y DNI.',
    estado: 'ok',
  },
  {
    id: 'declaracion',
    icono: 'shield',
    titulo: 'Declaración jurada',
    detalle: 'Se detectó la frase "no poseer seguro vigente" en la denuncia. Aceptada.',
    estado: 'ok',
  },
  {
    id: 'integridad',
    icono: 'scan',
    titulo: 'Integridad documental',
    detalle: 'El presupuesto fue detectado como duplicado y con adulteración de fecha y monto.',
    estado: 'error',
  },
];
