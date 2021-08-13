import { createSlice } from "@reduxjs/toolkit";
import getLoginClient from '../../apiAuth/loggedInClient';
import moment from 'moment';
import { showMessage, hideMessage } from "react-native-flash-message";
import { kycFormData, motorFormData } from "../../utility";
import { logout, restore } from "./auth";
import { Alert } from "react-native";

const cop_field = ['tin', 'inc_date', 'rc_number', 'inc_cert', 'website', 'sector', 'is_corporate']

export const kycSlice = createSlice({
    name: 'kyc',
    initialState: {
        kyc: {
            is_individual: true,
            gender: 'Female',
            state: 'Abia',
            id_type: 'Int Passport',
            expired_at: moment(new Date()).format('YYYY-MM-DD'),
            issued_at: moment(new Date()).format('YYYY-MM-DD'),
            dob: moment(new Date()).format('YYYY-MM-DD'),
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

export const saveKYCAsync = (body, callback) => async dispatch => {

    dispatch(processing(true))

    let hold = removeCopField(body)
    const formData = kycFormData(hold);
    const client = await getLoginClient();
    const link = body.update === undefined || body.update === null ? 'kyc/' : `kyc/${body.id}/`;
    const req = body.update === undefined || body.update === null? client.post : client.patch
    try{
        const {data, status} = await req(link, formData);
       
        if (status === 200 || status === 201){
            dispatch(create({...data, update: true}));
            showMessage({
                type: 'success',
                description: "Your KYC Details has been updated successfully",
                message: "Data Updated",
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
            callback()
            return;
        }
        await dispatch(error(true));
        if(status === 401){
            Alert.alert('Token Expired', 'Please login again to continue.')
            dispatch(logout());
            return;
        }

        if(status === 500){
            Alert.alert('Error', 'Please make sure all field are filled properly')
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
            description: "Error Processing your request",
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
       
        if (status === 200 || status === 201){
            dispatch(create({...data, update: true}));
            return;
        }
        await dispatch(error(true));
        if(status === 401){
            Alert.alert('Token Expired', 'Please login again to continue.')
            dispatch(logout());
            return;
        }
        
        if(status === 404){
            
            return;
        }

        if(status === 500){
            Alert.alert('Error', 'Please check your network')
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
            message: "Error Processing your request",
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        })
    }
    
}