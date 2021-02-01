import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {View, Alert, StyleSheet} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
//import { Picker } from '@react-native-community/picker';

export default function DrawerCustom(props){
    const {colors} = useTheme();
    const {user} = useSelector(state => state.auth)
    //const {Item} = Picker;
    
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
                        <Text style={styles.h4}>{user?.first_name}</Text>
                        <Text>{user?.email}</Text>
                    </View>
                </View>
            </View>
            <DrawerItemList {...props} />
            
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