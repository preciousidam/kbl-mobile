import AsyncStorage from "@react-native-community/async-storage";
import { createSlice } from "@reduxjs/toolkit";


export const appSlice = createSlice({
    name: 'auth',
    initialState: {
        terms: null,
    },
    reducers: {
        terms(state, action){
            const {terms} =  action.payload;
            return {
                ...state,
                terms
            };
        },
    }
});

export const {terms} = appSlice.actions;

export default appSlice.reducer;

export const bootstrap = payload => async dispatch => {
    try{
        setTimeout(
            () => dispatch(terms({terms: payload.terms})),
            1000
        );
        AsyncStorage.setItem('app', JSON.stringify({...payload}));
    }catch{
        
    }
}