import { createSlice } from "@reduxjs/toolkit";
import getLoginClient from '../../apiAuth/loggedInClient';
//import client from '../../apiAuth/tokenClient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { motorFormData, filterData } from "../../utility";
import { Alert } from "react-native";
import { restore } from "./auth";


export const policySlice = createSlice({
    name: 'policy',
    initialState: {
        policies: [],
        form: {
            vehicle_model: 'Audi Q3(2020)',
            vehicle_class: 'Private Vehicle / Car',
            plan: 'Bronze',
            building_type: 'Flat',
        },
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

export const savePolicyAsync = (product, body, navigation) => async dispatch => {
    dispatch(processing(true))
    const filteredData = filterData(product.category, body)
    let formdata;
    const client = await getLoginClient();

    if (product.category === 'Motor'){
        formdata = motorFormData(filteredData);
    }
    else if (product.category === 'Home'){
        
        let newItem = []
        if ('items' in filteredData){
            for(let [key,value] of Object.entries(filteredData.items)){
                newItem.push(value)
            }
            filteredData.items = newItem;
        }
        formdata = JSON.stringify(filteredData);
        client.defaults.headers.post['Content-Type'] = 'application/json';
    }

   
    
    try{
        const {data, status} = await client.post(product?.purchase_link, formdata);
        console.log(data)
        if (status === 200 || status === 201){
            dispatch(create(data));
            if (data){
                navigation.navigate('summary');
            }
            return;
        }
        await dispatch(error(true));
        if(status === 401){
            Alert.alert('Token Expired', 'Please login again to continue.')
            dispatch(restore({user: null}));
            return;
        }

        if(status === 500){
            showMessage({
                type: "danger",
                message: "Something happened cannot process your request at the moment.",
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
            return;
        }
        
        
        for (let item in data){
            showMessage({
                type: 'danger',
                message: item,
                description: data[item],
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
            description: "Please make sure all data are entered properly",
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
            Alert.alert('Token Expired', 'Please login again to continue.')
            dispatch(restore({user: null}));
            return;
        }
        
        if(status === 500){
            showMessage({
                type: "danger",
                message: "Something happened cannot process your request at the moment.",
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

