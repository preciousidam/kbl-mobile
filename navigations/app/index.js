import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import Dashboard from './screens/dashboard/Dashboard';
import DrawerCustom from '../../components/drawer';
import NotificationNavigation from './screens/notifications';
import {WithBadge} from '../../components/badge';
import { colors } from 'react-native-elements';
import { HomeNavigation } from './screens/dashboard';
import { KYCNavigation } from './screens/kyc';


const Drawer = createDrawerNavigator();

export const AppNavigator = ({}) => {

    const {Navigator, Screen} = Drawer;
    const count = useSelector(state => state.notifications.filter(({read}) => read === false).length);

    return (
        <Navigator drawerContent={props => <DrawerCustom {...props} />} >
            <Screen
                name="Home"
                component={HomeNavigation}
                options={{
                    title: 'Dashboard',
                    drawerIcon: ({color, size}) => <Ionicon name='ios-home' color={color} size={size} />
                }}
            />
            <Screen
                name="KYC"
                component={KYCNavigation}
                options={{
                    title: 'Update KYC',
                    drawerIcon: ({color, size}) => <AntDesign name="form" size={size} color={color} />
                }}
            />
            <Screen 
                component={NotificationNavigation}
                name="Notifications"
                options={{
                    title: 'Notifications',
                    drawerIcon: ({color, size}) => <WithBadge icon={<Ionicon name="ios-notifications" color={color} size={size} />} count={count} />,
                }}
            />
        </Navigator>
    )
}