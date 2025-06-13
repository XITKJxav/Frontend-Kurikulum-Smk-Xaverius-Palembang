import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  CreateEkstrakurikulerRequestModel,
  EkstrakurikulerModel,
  EkstrakurikulerResponseModel,
  UpdateEkstrakurikulerRequestModel,
} from "./model";
import { apiInstance } from "@utils/authInterceptor";

export default class EkstrakurikulerService {
  basePath: string = "/ektrakurikuler";
  api = new API();

  async fetchEkstrakurikulerOptionsRequest(
    params: string,
    callback: FetchCallback<EkstrakurikulerModel[][]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}&offLimit=true`;
    const res: APIResponse<EkstrakurikulerModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
  async fetchEkstrakurikulerRequest(
    params: string,
    callback: FetchCallback<EkstrakurikulerResponseModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<EkstrakurikulerResponseModel[]> =
      await apiInstance.GET(targetPath, accessToken ?? "");

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchEkstrakurikulerByidRequest(
    id: number,
    callback: FetchCallback<EkstrakurikulerModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<EkstrakurikulerModel[]> = await this.api.GET(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createEkstrakurikulerRequest(
    data: CreateEkstrakurikulerRequestModel,
    callback: FetchCallback<CreateEkstrakurikulerRequestModel>,
    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateEkstrakurikulerRequestModel> =
      await apiInstance.POST(targetPath, data, accessToken ?? "");

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async deleteEkstrakurikulerRequest(
    id: number,
    callback: FetchCallback<{}>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<{}> = await apiInstance.DELETE(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async updateEkstrakurikulerRequest(
    id: number,
    data: UpdateEkstrakurikulerRequestModel,
    callback: FetchCallback<UpdateEkstrakurikulerRequestModel>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;

    const res: APIResponse<UpdateEkstrakurikulerRequestModel> =
      await apiInstance.PUT(targetPath, data, accessToken ?? "");

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}
