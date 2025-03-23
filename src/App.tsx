import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import LayoutGuru from "@pages/guru/LayoutGuru";
import DashboardGuru from "@pages/guru/dashboard";
import Homepage from "@pages/siswa/Homepage";

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

          <Route path="/">
            <Route index element={<Homepage />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
