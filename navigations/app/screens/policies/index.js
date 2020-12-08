import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { PolicyListView } from './list';
import NewPolicy from './new';





const Stack = createStackNavigator();

export default function PolicyNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={PolicyListView}
                name="Policy-list"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={NewPolicy}
                name="new"
                options={{
                    headerShown: false,
                }}
            />
            
        </Navigator>
    )
}