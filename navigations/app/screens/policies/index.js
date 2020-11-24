import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';





const Stack = createStackNavigator();

export default function PolicyNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={Some}
                name="Policy-list"
                options={{
                    title: 'Notifications'
                }}
            />
            
        </Navigator>
    )
}

export const Some = () => <Text>Policies</Text>