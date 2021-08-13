import { useTheme } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewPolicy from './new';
import {SummaryView} from './summary';
import { PaymentOptionView } from './payment';
import PolicyDetails from './policy_detail';



const Stack = createStackNavigator();

export default function PolicyNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    const {colors} = useTheme();
    return (
        <Navigator>
            <Screen 
                component={NewPolicy}
                name="new"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={SummaryView}
                name="summary"
                options={{
                    title: 'Summary',
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTintColor: '#ffffff',
                }}
            />
            <Screen 
                component={PaymentOptionView}
                name="payOpt"
                options={{
                    title: 'Payment Option',
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTintColor: '#ffffff',
                }}
            />
            <Screen 
                component={PolicyDetails}
                name="polDet"
                options={{
                    title: 'Policy Details',
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontSize: 16,
                    }
                }}
            />
            
        </Navigator>
    )
}