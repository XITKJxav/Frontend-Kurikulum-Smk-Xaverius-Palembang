import { BrowserRouter,  Routes, Route } from "react-router-dom"
import ViewGuru from "./layouts/viewGuru"
import { SnackbarProvider } from "notistack";

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
        <Route path="/" element={<ViewGuru />}>
          <Route index element="hellow"/>
        </Route>
        <Route path="/guru" element={<ViewGuru />}>
          <Route index element="hellow"/>
        </Route>
      </Routes>
      </SnackbarProvider>
   </BrowserRouter>
  )
}

export default App
