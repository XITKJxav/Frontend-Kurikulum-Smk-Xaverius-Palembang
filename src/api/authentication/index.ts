import { APIResponse, FetchCallback } from "@types";
import API from "..";

import { LocalStorage } from "@utils/localStorage";
import {
  KaryawanSignInResponseRequestModel,
  SignInKaryawanRequestModel,
  SignInSiswaRequestModel,
  siswaSignInResponseRequestModel,
} from "./model";
import { useNavigate } from "react-router-dom";

export default class AuthtenticationService {
  basePathSignInKaryawan: string = "/karyawan/signin";
  basePathSignOutKaryawan: string = "/karyawan/signout";
  basePathSignInSiswa: string = "/siswa/signin";
  basePathSignOutSiswa: string = "/siswa/signout";
  basePathRefreshToken: string = "/siswa/refresh-token";
  private api: API = new API();

  async signinKaryawanRequest(
    data: SignInKaryawanRequestModel,
    callback: FetchCallback<KaryawanSignInResponseRequestModel[]>
  ) {
    const targetPath = this.basePathSignInKaryawan;

    const res: APIResponse<KaryawanSignInResponseRequestModel[]> =
      await this.api.POST(targetPath, data);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async signOutKaryawanRequest(
    accessToken: string,
    callback: FetchCallback<{}>
  ) {
    const targetPath = `${this.basePathSignOutKaryawan}`;
    const { deleteItem } = LocalStorage();

    const res: APIResponse<{}> = await this.api.POST(
      targetPath,
      {},
      accessToken
    );

    if (res?.status_code == 401) {
      deleteItem("karyawanData");
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async signInSiswaRequest(
    data: SignInSiswaRequestModel,
    callback: FetchCallback<siswaSignInResponseRequestModel[]>
  ) {
    const targetPath = this.basePathSignInSiswa;

    const res: APIResponse<siswaSignInResponseRequestModel[]> =
      await this.api.POST(targetPath, data);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async signOutSiswaRequest(accessToken: string, callback: FetchCallback<{}>) {
    const targetPath = `${this.basePathSignOutSiswa}`;
    const { deleteItem } = LocalStorage();
    const res: APIResponse<{}> = await this.api.POST(
      targetPath,
      {},
      accessToken
    );

    if (res?.status_code == 401) {
      deleteItem("userData");
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async refreshTokenRequest(
    callback: FetchCallback<{ access_token: string; refresh_token: string }>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const { deleteItem, getItem, setItem } = LocalStorage();
    const dataUser:
      | siswaSignInResponseRequestModel[]
      | KaryawanSignInResponseRequestModel[] = getItem("userData") || [];

    const targetPath = `${this.basePathRefreshToken}`;

    const res: APIResponse<{ access_token: string; refresh_token: string }> =
      await this.api.POST(targetPath, {}, dataUser[0].refresh_token);
    console.log(res);
    if (res?.status_code == 403) {
      deleteItem("userData");
      navigate(0);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Gagal memperbarui token");
    } else {
      const updatedUser:
        | siswaSignInResponseRequestModel
        | KaryawanSignInResponseRequestModel = {
        ...dataUser[0],
        access_token: res?.data?.access_token,
        refresh_token: res?.data?.refresh_token,
      };

      setItem("userData", [updatedUser]);
      callback.onSuccess(res.data);
    }
  }
}
