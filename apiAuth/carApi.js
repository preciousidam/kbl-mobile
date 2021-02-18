import axios from 'axios';
import {apiConfig} from '../settings/config';

export const carApi = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'X-Parse-Application-Id': 'naUbaTv5GbjFQmZvUvt38gJflOTrbhJrppHDwumy', // This is your app's application id
        'X-Parse-REST-API-Key': 'djjnol0BKpumY7ZKPPyFY9Mr6SlQaspL0YEZgB3i', // This is your app's REST API key
    }
})


carApi.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
carApi.interceptors.response.use(function (response) {
    // Do something with response data
    
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });