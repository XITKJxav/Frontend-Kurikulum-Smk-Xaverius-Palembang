import { LocalStorage } from "@utils/localStorage";
import { NavigateFunction } from "react-router-dom";
import API from "@api/index";

export const apiInstance = new API();

const setupInterceptor = (guard: string, navigate: NavigateFunction) => {
  const { deleteItem, setItem } = LocalStorage();

  apiInstance.api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        if (guard === "karyawan") {
          deleteItem("karyawanData");
          navigate("/sign-in");
        } else if (guard === "siswa") {
          deleteItem("userData");
          navigate("/");
        }
      } else if (err.response?.status === 403) {
        if (guard === "karyawan") {
          navigate(0);
          setItem("appPage", "home");
          return;
        } else if (guard == "siswa") {
          navigate("/dashboard-siswa");
          return;
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setupInterceptor;
