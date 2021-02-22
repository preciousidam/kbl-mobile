import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import getLoginClient from "../../apiAuth/loggedInClient";
import { logout } from "./auth";



export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        processing: false,
        error: false,
    },
    reducers: {
        all(state, action){
            const notifications = action.payload;
            return {
                ...state,
                notifications,
                processing: false,
                error: false
            }
        },
        update(state, action){
            const notification = action.payload;
            let data = state.notifications.filter(({id}) => id != notification.id)
            return {
                ...state,
                notifications: [...data, notification],
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
    }
});

export const {all, processing, error, update} = notificationSlice.actions;

export default notificationSlice.reducer;

export const updateNotificationAsync = _ => async dispatch => {
    dispatch(processing(true))
   
    const client = await getLoginClient();
    try{
        const {data, status} = await client.get(`notifications/`);
        dispatch(processing(false))
        if (status === 200 || status === 201){
            dispatch(all(data));
            return;
        }
        await dispatch(error(true));
        if(status === 401){
            Alert.alert('Token Expired', 'Please login again to continue.')
            dispatch(logout());
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
                message: item.toUpperCase(),
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
            description: err.message,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        })
    }
}

export const readNotificationAsync = details => async dispatch => {
    dispatch(processing(true))
    console.log(details)
    const client = await getLoginClient();
    client.defaults.headers.patch['Content-Type'] = 'application/json';
    try{
        const {data, status} = await client.patch(`notifications/${details?.id}/`, {details});
        dispatch(processing(false))
        console.log(data)
        if (status === 200 || status === 201){
            dispatch(update(data));
            return;
        }
        await dispatch(error(true));
        if(status === 401){
            Alert.alert('Token Expired', 'Please login again to continue.')
            dispatch(logout());
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
                message: item.toUpperCase(),
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
            description: err.message,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        })
    }
    
}