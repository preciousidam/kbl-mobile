import { createSlice } from "@reduxjs/toolkit";
import getLoginClient from '../../apiAuth/loggedInClient';
//import client from '../../apiAuth/tokenClient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { motorFormData } from "../../utility";


export const policySlice = createSlice({
    name: 'policy',
    initialState: {
        form: {},
        product: null,
        processing: false,
        error: false,
    },
    reducers: {
        edit(state, action){
            const form =  action.payload;
            return {
                ...state,
                form,
            };
        },
        create(state, action){
            const form = action.payload;
            return {
                ...state,
                form,
                processing: false,
                error: false
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
        },
        selected(state, action){
            const selected = action.payload;
            return {
                ...state,
                product: selected,
            }
        }
    }
});

export const {edit, create, processing, error, selected} = policySlice.actions;

export default policySlice.reducer;

export const savePolicyAsync = (link,body) => async dispatch => {
    dispatch(processing(true))
    const formData = motorFormData(body);
    const client = await getLoginClient();
    try{
        const {data, status} = await client.post(link, formData);
        
        if (status === 200 || status === 201){
            dispatch(create(data));
            return;
        }
        await dispatch(error(true));
        if(status === 401){
            showMessage({
                type: 'danger',
                description: "Please try again in a moment",
                message: 'Something happend',
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

