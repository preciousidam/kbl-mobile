import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {apiConfig} from '../settings/config';
import {useDispatch} from 'react-redux';
import {restore} from '../store/reducers/auth';


const getAccessToken = async () => {
    try {
        const retrievedItem = await AsyncStorage.getItem('tokenData');
        if (retrievedItem !== null) {
            const item = JSON.parse(retrievedItem);
            //console.log(item);
            const authorization = `Bearer ${item.access_token}`;
            // We have data!!
            return authorization;
        } 
        
        return null;
    } catch (error) {
    // Error retrieving data
    }
};

const loginClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        Accept: 'application/json',
    },
});

const getLoginClient = async () => {
    loginClient.defaults.headers.common.Authorization = await getAccessToken();
    return loginClient;
};

export const refreshToken = async refresh => {
    const client = await getLoginClient();
    try{ 
        const {data, status} = await client.post('auth/token/refresh/', {refresh})
        
        if (status === 201 || status === 200 ){
            let token = await AsyncStorage.getItem('tokenData');
            token = JSON.parse(token);
            token.access_token = data.access;
            console.log(token)
            await AsyncStorage.setItem('tokenData', JSON.stringify(token));
        
            return
        }
    }catch (err){
        console.log(err)
    }
}

export default getLoginClient;

function getUrl(config) {
    if (config.baseURL) {
        return config.url.replace(config.baseURL, '');
    }
    return config.url;
}

// Intercept all requests
loginClient.interceptors.request.use(
    config => {
       
        return config;
    },error => Promise.reject(error),
);

// Intercept all responses
loginClient.interceptors.response.use(
    async response => {
        
        return response;
    },
    async error => {
        
        console.log(error)
        if (error.response.status === 401) {
            try {
                const value = await AsyncStorage.getItem('tokenData');
                
                if (value !== null) {
                    // We have data!!
                    //let tokens = JSON.parse(value)
                    //refreshToken(tokens.refresh_token);
                    Alert.alert('Session Expired. Please login again.');
                    dispatch(restore({user: null}));
                }
            } catch (error) {
                // Error retrieving data
                console.log(error, 'User not logged in');
            }
        } 
        
        if (error.response.status === 429) {
            Alert.alert('Too many requests. Please try again later.');
        } 
       
        return {data: error.response.data, status: error.response.status}
    },
);