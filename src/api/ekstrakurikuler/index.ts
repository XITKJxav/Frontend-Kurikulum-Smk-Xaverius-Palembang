import { APIResponse, FetchCallback } from "@types";
import { LocalStorage } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";
import API from "..";
import {
  CreateEkstrakurikulerRequestModel,
  EkstrakurikulerModel,
  EkstrakurikulerResponseModel,
} from "./model";

export default class EkstrakurikulerService {
  basePath: string = "/ektrakurikuler";
  api = new API();

  private async handleUnauthorized(navigate: ReturnType<typeof useNavigate>) {
    const { deleteItem } = LocalStorage();
    deleteItem("userData");
    navigate(0);
  }

  async fetchEkstrakurikulerRequest(
    params: string,
    callback: FetchCallback<EkstrakurikulerResponseModel[]>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<EkstrakurikulerResponseModel[]> = await this.api.GET(
      targetPath
    );
    console.log(res);
    if (res?.status_code === 401) {
      this.handleUnauthorized(navigate);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchEkstrakurikulerByidRequest(
    id: string,
    callback: FetchCallback<EkstrakurikulerModel[]>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<EkstrakurikulerModel[]> = await this.api.GET(
      targetPath
    );

    if (res?.status_code === 401) {
      this.handleUnauthorized(navigate);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createEkstrakurikulerRequest(
    data: CreateEkstrakurikulerRequestModel,
    callback: FetchCallback<CreateEkstrakurikulerRequestModel>
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateEkstrakurikulerRequestModel> =
      await this.api.POST(targetPath, data);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}
