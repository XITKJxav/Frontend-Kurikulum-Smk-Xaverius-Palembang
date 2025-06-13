import { LocalStorage } from "@utils/localStorage";
import { NavigateFunction } from "react-router-dom";
import API from "@api/index";

export const apiInstance = new API();

const setupInterceptor = (guard: string, navigate: NavigateFunction) => {
  apiInstance.api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        const { deleteItem } = LocalStorage();

        if (guard === "karyawan") {
          deleteItem("karyawanData");
          navigate("/sign-in");
        } else if (guard === "siswa") {
          deleteItem("userData");
          navigate("/");
        }
      }
      if (err.response?.status === 403) {
        if (guard === "karyawan") {
          navigate("/akademik");
        } else {
          navigate("/dashboard-siswa");
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setupInterceptor;
