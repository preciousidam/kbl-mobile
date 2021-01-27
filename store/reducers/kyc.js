import { createSlice } from "@reduxjs/toolkit";
import getLoginClient from '../../apiAuth/loggedInClient';
//import client from '../../apiAuth/tokenClient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { motorFormData } from "../../utility";


export const kycSlice = createSlice({
    name: 'policy',
    initialState: {
        kyc: {},
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

export const saveKYCAsync = (link,body) => async dispatch => {
    const formData = motorFormData(body);
    const client = await getLoginClient();
    try{
        const {data, status} = await client.post('kyc/', formData);
       
        if (status === 200 || status === 201){
            dispatch(create(data));
            return;
        }
        await dispatch(error(true));
        
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