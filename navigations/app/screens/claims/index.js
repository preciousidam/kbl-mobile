import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {NewClaim} from './new';
import { MotorClaim } from './motor';
import { FireClaim } from './home';
import ClaimsForm from './form';





const Stack = createStackNavigator();

export default function ClaimNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={ClaimsForm}
                name="new"
                options={{
                    title: 'Claims Form',
                    headerTitleStyle: {
                        fontSize: 16,
                        fontFamily: 'Montserrat_700Bold'
                    }
                }}
            />
            <Screen 
                component={MotorClaim}
                name="motor"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={FireClaim}
                name="fire"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}
