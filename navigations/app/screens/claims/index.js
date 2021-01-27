import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {CliamListView} from './list';





const Stack = createStackNavigator();

export default function ClaimNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={CliamListView}
                name="Claim-list"
                options={{
                    headerShown: false,
                }}
            />
            
        </Navigator>
    )
}
