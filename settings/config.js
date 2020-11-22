import Constants  from 'expo-constants';
const { manifest } = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `kbl-admin.herokuapp.com`;

export const apiConfig = {
    baseUrl: `http://${api}/api/v1/`,
}