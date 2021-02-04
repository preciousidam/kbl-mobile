import Constants  from 'expo-constants';
const { manifest } = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:8000`)
  : `kblinsuranceng.com`;
  console.log(api)
export const apiConfig = {
    baseUrl: `http://kblinsuranceng.com/api/v1/`,
}