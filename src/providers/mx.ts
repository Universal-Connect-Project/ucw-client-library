
import configuration from '../configuration'
import {MxVcClient} from '../serviceClients/mxClient/vc';

const intClient = new MxVcClient(configuration.mxInt);
const prodClient = new MxVcClient(configuration.mxProd);

async function getVC(
    vcClient: MxVcClient,
    connection_id: string,
    type: string,
    userId: string,
    account_id: string
  ){
    let path = '';
    switch (type) {
      case 'identity':
        path = `users/${userId}/members/${connection_id}/customers?filters=name,addresses`;
        break;
      case 'accounts':
      case 'banking':
        path = `users/${userId}/members/${connection_id}/accounts`;
        break;
      case 'transactions':
        path = `users/${userId}/accounts/${account_id}/transactions`;
      default:
        break;
    }
    if (path) {
      console.info(`Getting mx vc ${type}`, path);
      return vcClient.getVC(path).then((vc) => {
        // for data security purpose when doing demo, should remove the connection once vc is returned to client.
        // clearConnection(vc, connection_id, userId);
        // console.log(vc)
        return vc;
      });
    }
    return null;
  }
    export function GetMxIntVc(connection_id: string, type: string, userId: string, account_id: string){
      return getVC(intClient, connection_id, type, userId, account_id);
    }

    export function GetMxProdVc(connection_id: string, type: string, userId: string, account_id: string){
      return getVC(prodClient, connection_id, type, userId, account_id);
    }
