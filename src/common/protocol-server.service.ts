import { IRequestContextStructure_ver_1_1_0 } from "../common/context";
import axios from "axios";

export class ProtocolServer {
  bap_client_URL = process.env.BAP_CLIENT_URI as string;
  context: IRequestContextStructure_ver_1_1_0;
  message: any;
  constructor(payload: {
    context: IRequestContextStructure_ver_1_1_0;
    message: any;
  }) {
    this.context = payload.context;
    this.message = payload.message;
  }
  async call() {
    const payload = {
      context: this.context,
      message: this.message
    };
    return axios.post(`${this.bap_client_URL}/${this.context.action}`, payload);
  }
}
