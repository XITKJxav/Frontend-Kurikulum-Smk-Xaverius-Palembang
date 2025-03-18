import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import LayoutGuru from "@pages/guru/layouts/LayoutGuru";
import DashboardGuru from "@pages/guru/dashboard";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Routes>
          <Route path="/guru" element={<LayoutGuru />}>
            <Route index element={<DashboardGuru />} />
          </Route>

          <Route path="/siswa" element={<LayoutGuru />}>
            <Route index element="hellow" />
          </Route>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
