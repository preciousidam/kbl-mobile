import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';


import List from '../../../../components/policy';
import FocusAwareStatusBar from '../../../../components/statusBar';
import ReadNotificationScreen from './read';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

export default function NotificationNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={NotificationScreen}
                name="Notifications"
                options={{
                    title: 'Notifications',
                    headerLeft: () => {
                        return (
                            <TouchableOpacity onPress={_ => navigation.toggleDrawer()}>
                                <View style={{marginHorizontal: 15,}}>
                                    <Ionicons name='ios-menu' size={30} color="#000" />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            <Screen 
                component={ReadNotificationScreen}
                name="Read"
                options={{
                    title: 'Notifications'
                }}
            />
        </Navigator>
    )
}

export function NotificationScreen({navigation}){

    const notifications = useSelector(state => state.notifications);
    const onPress = val => navigation.navigate('ReadNotifications', {id: val})
    const {colors, dark} = useTheme();

    return (
        <View style={{flex: 1}}>
            <List data={notifications} onPress={onPress} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    );
}