import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';


import List from '../../../../components/list';
import FocusAwareStatusBar from '../../../../components/statusBar';
import ReadNotificationScreen from './read';

const Stack = createStackNavigator();

export default function NotificationNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={NotificationScreen}
                name="Notifications"
                options={{
                    title: 'Notifications'
                }}
            />
            <Screen 
                component={ReadNotificationScreen}
                name="ReadNotifications"
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