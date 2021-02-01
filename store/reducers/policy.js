import { createSlice } from "@reduxjs/toolkit";
import getLoginClient from '../../apiAuth/loggedInClient';
//import client from '../../apiAuth/tokenClient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { motorFormData } from "../../utility";


export const policySlice = createSlice({
    name: 'policy',
    initialState: {
        policies: [],
        form: {},
        processing: false,
        error: false,
    },
    reducers: {
        all(state, action){
            const policies = action.payload;
            return {
                ...state,
                policies,
                processing: false,
                error: false
            }
        },
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
        }
    }
});

export const {edit, create, processing, error, selected, all} = policySlice.actions;

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

export const retrievePolicyAsync = user => async dispatch => {
    dispatch(processing(true))
   
    const client = await getLoginClient();
    try{
        const {data, status} = await client.get(`policies/${user}`);
        
        if (status === 200 || status === 201){
            dispatch(all(data));
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

