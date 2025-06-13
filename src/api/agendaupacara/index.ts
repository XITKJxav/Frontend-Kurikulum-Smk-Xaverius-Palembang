import { APIResponse, FetchCallback } from "@types";
import {
  AgendaUpacaraModel,
  AgendaUpacaraResponseModel,
  CreateAgendaUpacaraModel,
  UpdateAgendaUpacaraModel,
} from "./model";
import { apiInstance } from "@utils/authInterceptor";

export default class AgendaUpacaraService {
  basePath: string = "/agenda-upacara";

  async fetchAgendaUpacaraRequest(
    params: string,
    callback: FetchCallback<AgendaUpacaraResponseModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<AgendaUpacaraResponseModel[]> =
      await apiInstance.GET(targetPath, accessToken);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
  async fetchAgendaUpacaraOptionRequest(
    params: string,
    callback: FetchCallback<AgendaUpacaraModel[][]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<AgendaUpacaraModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchAgendaUpacaraByidRequest(
    id: string,
    callback: FetchCallback<AgendaUpacaraModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<AgendaUpacaraModel[]> = await apiInstance.GET(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createAgendaUpacaraRequest(
    data: CreateAgendaUpacaraModel,
    callback: FetchCallback<CreateAgendaUpacaraModel>,
    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateAgendaUpacaraModel> = await apiInstance.POST(
      targetPath,
      data,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async updateAgendaUpacaraRequest(
    id_agenda_upacara: string,
    data: UpdateAgendaUpacaraModel,
    callback: FetchCallback<UpdateAgendaUpacaraModel>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id_agenda_upacara}`;
    const res: APIResponse<UpdateAgendaUpacaraModel> = await apiInstance.PUT(
      targetPath,
      data,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}
