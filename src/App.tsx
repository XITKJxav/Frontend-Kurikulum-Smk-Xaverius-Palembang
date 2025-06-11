import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import LayoutGuru from "@pages/guru/LayoutGuru";
import DashboardGuru from "@pages/guru/dashboard";
import Homepage from "@pages/siswa/Homepage";
import KaryawanSigninPage from "@pages/guru/login";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        maxSnack={3}
        style={{ marginTop: "70px" }}
      >
        <Routes>
          <Route path="/akademik" element={<LayoutGuru />}>
            <Route index element={<DashboardGuru />} />
          </Route>
          <Route path="/sign-in" element={<KaryawanSigninPage />} />
          <Route index element={<Homepage />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
