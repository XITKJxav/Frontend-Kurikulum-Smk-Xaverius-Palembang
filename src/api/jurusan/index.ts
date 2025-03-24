import { APIResponse } from "@types";
import { jurusanModel } from "./model";
import API from "..";

export default class JurusanService {
  basePath: string = "/kas";
  private api: API = new API();

  async get() {
    const targetPath = this.basePath + "?sort=created_at&desc=true";
    const res: APIResponse<jurusanModel[]> = await this.api.GET(targetPath);
    return res;
  }
}
