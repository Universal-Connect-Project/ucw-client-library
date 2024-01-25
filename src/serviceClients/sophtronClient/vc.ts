import * as http from '../../infra/http';
import SophtronBaseClient from './base';
import {buildSophtronAuthCode} from '../..'
import ProviderCredentials from '../../configuration';
import SophtronClient from './';

const sophtronClient = new SophtronClient(ProviderCredentials.sophtron);

export default class SophtronVcClient extends SophtronBaseClient{
  constructor(apiConfig: any){
    super(apiConfig);
  }

  async getVC(path: string) {
    const res = await sophtronClient.getUserIntegrationKey();
    const headers = { 
      IntegrationKey: res.IntegrationKey,
      Authorization: buildSophtronAuthCode('get', path, this.apiConfig.clientId, this.apiConfig.secret)
    };
    const ret = await http.get(`${this.apiConfig.vcEndpoint}vc/${path}`, headers)
    return ret?.vc || ret;
  }
};
