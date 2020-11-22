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
                terms: terms === undefined? null : terms,
            };
        },
    }
});

export const {terms} = appSlice.actions;

export default appSlice.reducer;

export const bootstrap = payload => async dispatch => {
    try{
        dispatch(terms({terms: payload.terms === undefined? null : true})),
        AsyncStorage.setItem('apps', JSON.stringify({terms: payload.terms === undefined? null : true}));
    }catch{
        
    }
}