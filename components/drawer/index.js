import React, { useEffect } from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {View, Alert, StyleSheet} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../store/reducers/auth';
import {updateNotificationAsync} from '../../store/reducers/notification';

export default function DrawerCustom(props){
    const {colors} = useTheme();
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    //const {Item} = Picker;
    const signOut = _ => {
        dispatch(logout());
    }

    useEffect(() => {
        dispatch(updateNotificationAsync(user?.pk));
    },[user?.pk])
    
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{height: '100%'}}>
            <View style={styles.header}>
                <View style={styles.headerprofile}>
                    <Avatar 
                        rounded 
                        size="medium" 
                        icon={{name: 'person', type: 'ionicons', color: '#fff'}} 
                        containerStyle={{backgroundColor: colors.primary, marginTop: 10, marginLeft: 20,}} 
                    />
                    <View style={{flexDirection: "column", padding: 10}}>
                        <Text style={[styles.h4, {color: colors.text}]}>{user?.first_name}</Text>
                        <Text style={[{color: colors.text}]}>{user?.email}</Text>
                    </View>
                </View>
            </View>
            <DrawerItemList {...props} />
            <View style={[styles.bottom,{bottom: 40}]}>
                <Text onPress={signOut} style={{color: '#8d8d8d'}}>Logout</Text>
                
            </View>
            <View style={styles.bottom}>
                <Text style={{color: '#8d8d8d'}}>Version 0.0.1</Text>
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        borderTopColor: "rgba(166, 166, 166, 0.2)",
        borderTopWidth: 1,
    },
    header: {
        borderBottomColor: "rgba(166, 166, 166, 0.2)",
        borderBottomWidth: 1,
    },
    headerprofile: {
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    h4: {
        fontSize: 20,
    },
    bottom: {
        position: "absolute",
        bottom: 0,
        padding: 10,
        paddingVertical: 5,
        borderTopColor: "rgba(166, 166, 166, 0.2)",
        borderTopWidth: 1,
        width: '100%'
    },  
});