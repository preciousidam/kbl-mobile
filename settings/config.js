import Constants  from 'expo-constants';
const { manifest } = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `kblinsurancebiz.com`;

export const apiConfig = {
    baseUrl: `https://kblinsurancebiz.com/api/v1/`,
}