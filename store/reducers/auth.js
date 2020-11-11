import AsyncStorage from "@react-native-community/async-storage";
import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: true,
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
                isLoading: false,
                user,
            };
        },
    }
});

export const {login, logout, restore} = authSlice.actions;

export default authSlice.reducer;

export const signIn = details => async dispatch => {
    try{
        ///perform login async task
        setTimeout(
            () => dispatch(login({user: details})),
            3000
        );
        AsyncStorage.setItem('user', JSON.stringify(details));
    }catch{
        
    }
}