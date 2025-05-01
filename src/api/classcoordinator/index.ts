import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { ClassAdministratorModel, LoginClassAdministratorModel } from "./model";

export default class ClassCoordinatorService {
  basePath: string = "/login/administorclass";
  private api: API = new API();

  async signInClassCoordinatorRequest(
    data: LoginClassAdministratorModel,
    callback: FetchCallback<ClassAdministratorModel>
  ) {
    const targetPath = this.basePath;

    const res: APIResponse<ClassAdministratorModel> = await this.api.POST(
      targetPath,
      data
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }
}
