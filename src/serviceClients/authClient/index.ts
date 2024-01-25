import config from '../../config';
import * as http from '../../infra/http';

export class AuthClient {
  secretExchange(payload: any){
    return this.post(`/secretexchange`, {Payload: payload})
  }

  async post(path: string, data: any) {
    const phrase = 'basic ' + Buffer.from(`${config.UcpClientId}:${config.UcpClientSecret}`).toString('base64');
    const ret = await http.post(config.AuthServiceEndpoint + path, data, {Authorization: phrase});
    return ret;
  }
};
