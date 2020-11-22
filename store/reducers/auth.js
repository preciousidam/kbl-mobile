import AsyncStorage from "@react-native-community/async-storage";
import jwtDecode from 'jwt-decode';
import { createSlice } from "@reduxjs/toolkit";
import client from '../../apiAuth/tokenClient';
import getLoginClient from '../../apiAuth/loggedInClient';
import { showMessage, hideMessage } from "react-native-flash-message";



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
        
        if (status === 201 || status === 200 ){
            await AsyncStorage.setItem('tokenData', JSON.stringify({access_token: data.access_token, refresh_token: data.refresh_token}));
            dispatch(login({user: data.user}));
            AsyncStorage.setItem('user', JSON.stringify(data.user))
            return
        }
        showMessage({
            type: 'danger',
            message: data.detail,
            icon: 'auto',
            duration: 3000,
        })
        dispatch(processing({loading: false}));
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
        showMessage({
            type: 'danger',
            message: err.message,
            icon: 'auto',
            duration: 3000,
        })
    }
}

export const signUp = details => async dispatch => {
    
    try{ 
        dispatch(processing({loading: true}));
        const {data, status} = await client.post('users/', {...details})
        
        if (status === 201 || status === 200 ){
            await AsyncStorage.setItem('tokenData', JSON.stringify(data));
            dispatch(signIn({email: data.email, password: details.password, username: data.email}));
            return
        }
        showMessage({
            type: 'danger',
            message: data.detail,
            icon: 'auto',
            duration: 3000,
        })
        dispatch(processing({loading: false}));
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
        showMessage({
            type: 'danger',
            message: err.message,
            icon: 'auto',
            duration: 3000,
        })
    }
}


export const getUserProfile = async (user_id, dispatch) => {
    try{
        const loginClient = await getLoginClient();
        const {data, status} = await loginClient.get(`profile/${user_id}`);
        if (status === 201 || status === 200 ){
            dispatch(processing({loading: true}));
            dispatch(login(JSON.stringify({data})));
            return
        }
        dispatch(processing({loading: false}));
        showMessage({
            type: 'danger',
            message: data.detail,
            icon: 'auto',
            duration: 3000,
        });
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
        showMessage({
            type: 'danger',
            message: err.message,
            icon: 'auto',
            duration: 3000,
        })
    }
}