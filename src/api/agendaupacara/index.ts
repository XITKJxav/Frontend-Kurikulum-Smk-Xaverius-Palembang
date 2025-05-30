import { APIResponse, FetchCallback } from "@types";
import {
  AgendaUpacaraModel,
  AgendaUpacaraResponseModel,
  CreateAgendaUpacaraModel,
  UpdateAgendaUpacaraModel,
} from "./model";
import { LocalStorage } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";
import API from "..";

export default class AgendaUpacaraService {
  basePath: string = "/agenda-upacara";
  api = new API();

  private async handleUnauthorized(navigate: ReturnType<typeof useNavigate>) {
    const { deleteItem } = LocalStorage();
    deleteItem("userData");
    navigate(0);
  }

  async fetchAgendaUpacaraRequest(
    params: string,
    callback: FetchCallback<AgendaUpacaraResponseModel[]>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<AgendaUpacaraResponseModel[]> = await this.api.GET(
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

  async fetchAgendaUpacaraByidRequest(
    id: string,
    callback: FetchCallback<AgendaUpacaraModel[]>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<AgendaUpacaraModel[]> = await this.api.GET(
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

  async createAgendaUpacaraRequest(
    data: CreateAgendaUpacaraModel,
    callback: FetchCallback<CreateAgendaUpacaraModel>
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateAgendaUpacaraModel> = await this.api.POST(
      targetPath,
      data
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
    callback: FetchCallback<UpdateAgendaUpacaraModel>
  ) {
    const targetPath = `${this.basePath}/${id_agenda_upacara}`;
    const res: APIResponse<UpdateAgendaUpacaraModel> = await this.api.PUT(
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
