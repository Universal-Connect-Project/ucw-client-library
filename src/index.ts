import CryptoJS from 'crypto-js';
import * as crypto from 'crypto';
import config from './config';
import ProviderCredentials from './configuration';
import axios from 'axios';

import {AuthClient} from './serviceClients/authClient';
import SophtronClient from './serviceClients/sophtronClient';
import {GetSophtronVc} from './providers/sophtron';
import {GetMxIntVc, GetMxProdVc} from './providers/mx';
import GetAkoyaVc from './providers/akoya';
import GetFinicityVc from './providers/finicity';

export function hmac(text: string, key: string) {
    let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, CryptoJS.enc.Base64.parse(key));
    hmac.update(text);
    return CryptoJS.enc.Base64.stringify(hmac.finalize());
}

export function buildSophtronAuthCode(httpMethod: string, url: string, apiUserID: string, secret: string) {
    let authPath = url.substring(url.lastIndexOf('/')).toLowerCase();
    let text = httpMethod.toUpperCase() + '\n' + authPath;
    let b64Sig = hmac(text, secret);
    let authString = 'FIApiAUTH:' + apiUserID + ':' + b64Sig + ':' + authPath;
    return authString;
}

function encrypt(text: string, keyHex: string, ivHex: string) {
    if (!text) {
        return '';
    }
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

async function post(path: string, data: any) {
    const phrase = 'basic ' + Buffer.from(`${config.UcpClientId}:${config.UcpClientSecret}`).toString('base64');
    const res = await axios.post(config.AuthServiceEndpoint + path, data, { headers: { Authorization: phrase } })
    return res.data;
}

function secretExchange(payload: any) {
    return post(`/secretexchange`, { Payload: payload })
}

export async function getAuthCode() {
    const key = Buffer.from(config.UcpEncryptionKey, 'base64').toString('hex');
    const iv = crypto.randomBytes(16).toString('hex');
    const payload = encrypt(JSON.stringify(ProviderCredentials), key, iv);
    const token = await secretExchange(payload);
    const str = `ucp;${token.Token};${iv}`
    const b64 = Buffer.from(str).toString('base64')
    return b64;
}

export function getVc(provider: string, connectionId: string, type: string, userId: string, account_id: string, startTime?: string, endTime?: string){
    console.info(`Getting vc from provider: ${provider}`)
    switch(provider){
      case 'mx':
        return GetMxProdVc(connectionId, type, userId, account_id);
      case 'mx-int':
      case 'mx_int':
        return GetMxIntVc(connectionId, type, userId, account_id);
      case 'akoya':
        return GetAkoyaVc(connectionId, type, userId);
      case 'finicity':
        return GetFinicityVc(connectionId, type, userId);
      case 'sophtron':
        return GetSophtronVc(connectionId, type, userId, account_id, startTime, endTime);
    }
  }