import { APIResponse, FetchCallback } from "@types";
import {
  JurusanCreateModel,
  JurusanModel,
  JurusanResponse,
  JurusanUpdateModel,
} from "./model";
import API from "..";

export default class JurusanService {
  basePath: string = "/jurusan";
  private api: API = new API();

  async fetchJurusanRequest(
    params: string,
    callback: FetchCallback<JurusanResponse[]>
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<JurusanResponse[]> = await this.api.GET(targetPath);

    console.log("data api=" + res?.data);
    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createJurusanRequest(
    data: JurusanCreateModel,
    callback: FetchCallback<JurusanCreateModel>
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<JurusanModel> = await this.api.POST(
      targetPath,
      data
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchProgramJurusanById(
    id: string,
    callback: FetchCallback<JurusanModel[]>
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<JurusanModel[]> = await this.api.GET(targetPath);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async updateStatusJurusanRequest(
    id: string,
    data: JurusanUpdateModel,
    callback: FetchCallback<JurusanUpdateModel>
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<JurusanUpdateModel> = await this.api.PUT(
      targetPath,
      data
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}
