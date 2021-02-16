import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';


import FocusAwareStatusBar from '../../../../components/statusBar';
import ReadNotificationScreen from './read';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Empty } from '../../../../components/policy/policy';

const Stack = createStackNavigator();

export default function NotificationNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    const {colors} = useTheme();
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
                                    <Ionicons name='ios-menu' size={30} color={colors.text} />
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

    const {notifications, processing} = useSelector(state => state.notifications);
    const onPress = val => navigation.navigate('Read', {id: val})
    const {colors, dark} = useTheme();

    const dispatch = useDispatch();
    
    const {navigate} = navigation;
    
    const refresh = () => {
        dispatch(retrievePolicyAsync(user.pk));
    }
    
    const renderItems = ({item, index}) => (
        <Notification
            {...item}
            onPress={_ => onPress(item?.id)}
        />);


    return (
        <View style={{flex: 1}}>
            <FlatList
                refreshing={processing}
                onRefresh={refresh}
                data={notifications}
                keyExtractor={(item,i) => item.body+i}
                renderItem={renderItems}
                contentContainerStyle={{paddingHorizontal: wp('3%'), paddingVertical: hp('1%'), paddingBottom: wp("5%"),}}
                ListEmptyComponent={Empty}
            />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    );
}

export const Notification = ({id, title, body, time, read, onPress}) => {
    const {colors} = useTheme();
    return (
        <Pressable onPress={onPress}>
            <View style={styles.view}>
                <Text style={[styles.title, {color: read? "#c6c6c6": colors.text}]}>{title}</Text>
                <Text style={[styles.body, {color: read? "#c6c6c6": colors.text}]}>{body}</Text>
                <Text style={[styles.time, {color: read? "#c6c6c6": colors.text}]}>{moment(time).fromNow()}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    view: {
        borderBottomWidth: 1,
        borderBottomColor: '#565656',
        paddingVertical: hp('1%')
    },
    title: {
        fontFamily: "Montserrat_700Bold",
        fontSize: wp('3.5%'),
    },
    body: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: wp("3%")
    },
    time: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: wp("2.6%"),
        alignSelf: 'flex-end'
    }
})