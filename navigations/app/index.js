import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';

import Dashboard from './screens/dashboard/Dashboard';
import DrawerCustom from '../../components/drawer';
import NotificationNavigation from './screens/notifications';
import {WithBadge} from '../../components/badge';
import { MainNavigator } from './screens/dashboard';
import { KYCNavigation } from './screens/kyc';
import { BranchesRoute } from './screens/branches';
import { Products } from './screens/products';


const Drawer = createDrawerNavigator();

export const AppNavigator = ({}) => {

    const {Navigator, Screen} = Drawer;
    const count = useSelector(state => state.notifications.notifications?.filter(({read}) => read === false).length);

    return (
        <Navigator drawerContent={props => <DrawerCustom {...props} />} >
            <Screen
                name="Home"
                component={MainNavigator}
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
                name="products"
                component={Products}
                options={{
                    title: 'Products Infomation',
                    drawerIcon: ({color, size}) => <AntDesign name="shoppingcart" size={size} color={color} />
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
            <Screen 
                component={BranchesRoute}
                name="Branches"
                options={{
                    title: 'Branches',
                    drawerIcon: ({color, size}) => <MaterialIcons name="business" color={color} size={size} />,
                }}
            />
        </Navigator>
    )
}