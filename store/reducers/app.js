import AsyncStorage from "@react-native-community/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import client from '../../apiAuth/guestClient';


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        terms: null,
        products: [],
        processing: false,
        error: false,
    },
    reducers: {
        terms(state, action){
            
            const {terms} =  action.payload;
            return {
                ...state,
                terms: terms === undefined? null : terms,
            };
        },
        products(state, action){
            const products = action.payload;
            return {
                ...state,
                products
            }
        },
        processing(state, action){
            const process = action.payload;
            return {
                ...state,
                processing: process,
            }
        },
        error(state, action){
            const error = action.payload;
            return {
                ...state,
                error, 
                processing: false,
            }
        }
    }
});

export const {terms, products, processing, error} = appSlice.actions;

export default appSlice.reducer;

export const bootstrap = payload => async dispatch => {
    
    try{
        dispatch(terms({terms: payload.terms === undefined? null : true})),
        AsyncStorage.setItem('apps', JSON.stringify({terms: payload.terms === undefined? null : true}));
    }catch{
        
    }
}

export const retrieveProductsAsync = _ => async dispatch => {
    dispatch(processing(true))
   
    try{
        const {data, status} = await client.get(`products/`);
        
        if (status === 200 || status === 201){
            dispatch(products(data));
            return;
        }
        await dispatch(error(true));
        if(status === 401){
            /*showMessage({
                type: 'danger',
                description: "Please try again in a moment",
                message: 'Something happend',
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })*/
            
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
    }catch (err){
        console.error(err)
        dispatch(error(true));
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

