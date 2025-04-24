import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { loginclassAdministaorModel } from "./model";

export default class ClassAdministaorModel {
  basePath: string = "/login/administorclass";
  private api: API = new API();
  async loginUsersClassAdministor(
    params: string,
    callback: FetchCallback<ClassAdministaorModel>
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<ClassAdministaorModel> = await this.api.GET(
      targetPath
    );
    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }
}
