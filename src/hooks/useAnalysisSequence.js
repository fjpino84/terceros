import { useEffect, useRef, useState } from 'react';

const DURACION_ANALISIS_MS = 1400;

// Orquesta la animación de "análisis" documento por documento.
// documentos: array de ids en el orden en que se procesan.
// documentosYaResueltos: ids que ya tienen un veredicto (se muestran directo, sin animación).
// duracionMs: tiempo que cada item pasa en fase 'analizando' antes de resolverse.
// Devuelve { fases, indiceActual, terminado } donde fases[id] es 'pendiente' | 'analizando' | resultado final.
export function useAnalysisSequence(
  documentos,
  resultadosPorDocumento,
  activo,
  documentosYaResueltos = [],
  duracionMs = DURACION_ANALISIS_MS,
) {
  const [fases, setFases] = useState(() =>
    Object.fromEntries(
      documentos.map((id) => [
        id,
        documentosYaResueltos.includes(id) ? resultadosPorDocumento[id]?.estado ?? 'ok' : 'pendiente',
      ]),
    ),
  );
  const pendientesDeAnimar = documentos.filter((id) => !documentosYaResueltos.includes(id));
  const [indiceActual, setIndiceActual] = useState(-1);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!activo) return undefined;

    let indice = 0;

    const procesarSiguiente = () => {
      if (indice >= pendientesDeAnimar.length) {
        setIndiceActual(pendientesDeAnimar.length);
        return;
      }
      const idActual = pendientesDeAnimar[indice];
      setIndiceActual(indice);
      setFases((prev) => ({ ...prev, [idActual]: 'analizando' }));

      timeoutRef.current = setTimeout(() => {
        setFases((prev) => ({ ...prev, [idActual]: resultadosPorDocumento[idActual]?.estado ?? 'ok' }));
        indice += 1;
        procesarSiguiente();
      }, duracionMs);
    };

    procesarSiguiente();

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo]);

  const sobrescribirFase = (id, fase) => {
    setFases((prev) => ({ ...prev, [id]: fase }));
  };

  return {
    fases,
    indiceActual,
    totalAAnimar: pendientesDeAnimar.length,
    terminado: indiceActual >= pendientesDeAnimar.length,
    sobrescribirFase,
  };
}
