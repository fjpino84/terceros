import { CaseProvider, useCase } from './context/CaseContext.jsx';
import PantallaInicio from './pages/PantallaInicio.jsx';
import PantallaDatosIniciales from './pages/PantallaDatosIniciales.jsx';
import PantallaCargaDocumentos from './pages/PantallaCargaDocumentos.jsx';
import PantallaAnalisisLisa from './pages/PantallaAnalisisLisa.jsx';
import PantallaResultadoExito from './pages/PantallaResultadoExito.jsx';
import PantallaResultadoRechazo from './pages/PantallaResultadoRechazo.jsx';

const PANTALLAS = {
  inicio: PantallaInicio,
  datos: PantallaDatosIniciales,
  documentos: PantallaCargaDocumentos,
  analisis: PantallaAnalisisLisa,
  resultadoExito: PantallaResultadoExito,
  resultadoRechazo: PantallaResultadoRechazo,
};

function Enrutador() {
  const { pantalla } = useCase();
  const Pantalla = PANTALLAS[pantalla] ?? PantallaInicio;
  return <Pantalla />;
}

export default function App() {
  return (
    <CaseProvider>
      <Enrutador />
    </CaseProvider>
  );
}
