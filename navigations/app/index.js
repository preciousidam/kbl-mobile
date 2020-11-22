import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Dashboard from './screens/Dashboard';


const Drawer = createDrawerNavigator();

export const AppNavigator = ({}) => {

    const {Navigator, Screen} = Drawer;

    return (
        <Navigator>
            <Screen
                name="Home"
                component={Dashboard}
                options={{
                    title: 'Dashboard'
                }}
            />
        </Navigator>
    )
}