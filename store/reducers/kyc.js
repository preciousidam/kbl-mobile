import { createSlice } from "@reduxjs/toolkit";
import getLoginClient from '../../apiAuth/loggedInClient';
//import client from '../../apiAuth/tokenClient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { kycFormData, motorFormData } from "../../utility";
import { refreshToken } from "./auth";

const cop_field = ['tin', 'inc_date', 'rc_number', 'inc_cert', 'website', 'sector', 'is_corporate']

export const kycSlice = createSlice({
    name: 'policy',
    initialState: {
        kyc: {
            is_individual: true,
        },
        processing: false,
        error: false,
    },
    reducers: {
        edit(state, action){
            const kyc =  action.payload;
            return {
                ...state,
                kyc,
            };
        },
        create(state, action){
            const kyc = action.payload;
            return {
                ...state,
                kyc,
                processing: false,
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

export const {edit, create, processing, error} = kycSlice.actions;

export default kycSlice.reducer;

const removeCopField = body => {
    let hold = {...body};
    cop_field.forEach(field => delete hold[field])
    return hold;
}

export const saveKYCAsync = body => async dispatch => {
    hold = removeCopField(body)
    const formData = kycFormData(hold);
    const client = await getLoginClient();
    try{
        const {data, status} = await client.post('kyc/', formData);
       console.log(data)
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
                description: data[item],
                message: item,
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

export const fetchKYCAsync = email => async dispatch => {
    
    const client = await getLoginClient();
    try{
        const {data, status} = await client.post('kyc/retrieve_by_email/', {email});
        console.log(data)
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
                description: data[item],
                message: item,
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