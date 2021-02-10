import AsyncStorage from "@react-native-community/async-storage";
import jwtDecode from 'jwt-decode';
import { createSlice } from "@reduxjs/toolkit";
import client from '../../apiAuth/tokenClient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { isAvailableAsync, setItemAsync } from 'expo-secure-store';
import { Alert } from "react-native";
import getLoginClient from "../../apiAuth/loggedInClient";
import { colors } from "react-native-elements";



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isRestoring: true,
        isSignOut: true,
        user: null,
    },
    reducers: {
        login(state, action){
            const {user} =  action.payload;
            return {
                ...state,
                isSignOut: false,
                user,
            };
        },
        logout(state){
            AsyncStorage.removeItem('user');
            return {...state, isSignOut: true, user: null};
        },
        restore(state, action){
            const {user} =  action.payload;
            return {
                ...state,
                isRestoring: false,
                user,
            };
        },
        processing(state, action){
            const {loading} = action.payload;
            return {
                ...state, isLoading: loading,
            }
        }
    }
});

export const {login, logout, restore, processing} = authSlice.actions;

export default authSlice.reducer;

export const signIn = details => async dispatch => {
    
    try{ 
        dispatch(processing({loading: true}));
        const {data, status} = await client.post('auth/login/', {...details})
        dispatch(processing({loading: false}));
        
        if (status === 201 || status === 200 ){
            await AsyncStorage.setItem('tokenData', JSON.stringify({access_token: data.access_token, refresh_token: data.refresh_token}));
            dispatch(login({user: data.user}));
            let secureStore = await isAvailableAsync();
            if(secureStore){
                setItemAsync('username',details.username);
                setItemAsync('password',details.password);
            }
            AsyncStorage.setItem('user', JSON.stringify(data.user))
            const pushToken = await AsyncStorage.getItem('pushToken');
            dispatch(savePushToken(data.user.pk, pushToken));
            return
        }
        for (let item in data){
            showMessage({
                type: 'danger',
                message: item.toUpperCase(),
                description: data[item],
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
        }
        
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
        showMessage({
            type: 'danger',
            message: "Something happened",
            description: err.message,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        })
    }
}

export const refreshToken = refresh => async dispatch => {
    
    try{ 
        const {data, status} = await client.post('auth/token/refresh/', {refresh})
        
        
        if (status === 201 || status === 200 ){
            let token = await AsyncStorage.getItem('tokenData');
            token = JSON.parse(token);
            token.access_token = data.access;
            
            await AsyncStorage.setItem('tokenData', JSON.stringify(token));
        
            return
        }
        for (let item in data){
            showMessage({
                type: 'danger',
                message: {item},
                description: data[item],
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
        }
        dispatch(processing({loading: false}));
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
        showMessage({
            type: 'danger',
            message: "Something happened",
            description: err.message,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        })
    }
}

export const signUp = details => async dispatch => {
    
    try{ 
        dispatch(processing({loading: true}));
        
        const {data, status} = await client.post('users/', {...details})
        dispatch(processing({loading: false}));
        
        if (status === 201 || status === 200 ){
            
            dispatch(signIn({email: data.email, password: details.password, username: data.email}));
            return
        }

        if (status === 400){
            for (let item in data){
                showMessage({
                    type: 'danger',
                    message: item.toUpperCase(),
                    description: data[item][0],
                    icon: 'auto',
                    duration: 3000,
                    hideStatusBar: true,
                })
            }
        }
        if(status === 500) throw 'Someone happen please check back later or contact support'
        
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
        showMessage({
            type: 'danger',
            message: "Something happened",
            description: err.message,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        })
    }
}

export const savePushToken = (user, token) => async dispatch => {
    const client = await getLoginClient();
    client.defaults.headers.post['Content-type'] = 'application/json';
    try{
        const {data, status} = await client.post(`push-token/save/`, {user,token})
    }
    catch{
        console.log(err)
    }
}

export const changePassword = details => async dispatch => {
    
    const client = await getLoginClient();
    dispatch(processing({loading: true}));
    client.defaults.headers.post['Content-type'] = 'application/json';
    try{
        const {data, status} = await client.post(`auth/password/change/`, details)
        
        dispatch(processing({loading: false}));
        if (status === 200 || status === 201){
            showMessage({
                type: 'success',
                message: data.message,
                duration: 3000,
                icon: 'success',
                hideStatusBar: true,
            })
            dispatch(logout());
            Alert.alert('Notice', 'Password change was succesful, you need to login again with new password');
            return;
        }

        if(status === 401){
            Alert.alert('Token Expired', 'Please login again to continue.')
            dispatch(logout());
            return;
        }

        if(status === 500){
            showMessage({
                type: "danger",
                message: "Something happened cannot process your request at the moment.",
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
            return;
        }
        
        for (let item in data){
            showMessage({
                type: 'danger',
                message: data[item],
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
        }
        return;
    }
    catch(err){
        dispatch(processing(false));
        console.error(err)
        showMessage({
            type: 'danger',
            message: "Something happened",
            description: err.message,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        });
    }
}


