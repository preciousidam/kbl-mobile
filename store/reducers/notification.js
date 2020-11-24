import { createSlice } from "@reduxjs/toolkit";
import {notifications} from '../../constants';


export const notificationSlice = createSlice({
    name: 'notification',
    initialState: notifications,
    reducers: {
        update(state, action){
            const {notifications} =  action.payload;
            return [
                ...state,
                ...notifications
            ];
        },
    }
});

export const {update} = notificationSlice.actions;

export default notificationSlice.reducer;

export const updateAsync = _ => async dispatch => {
    try{
        
    }catch{

    }
}