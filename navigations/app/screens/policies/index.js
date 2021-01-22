import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { PolicyListView } from './list';
import NewPolicy from './new';
import { KYCForm } from './kyc';
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
            <Screen 
                component={KYCForm}
                name="confirmKYC"
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