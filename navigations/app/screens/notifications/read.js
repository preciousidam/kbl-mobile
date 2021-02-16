import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import FocusAwareStatusBar from '../../../../components/statusBar';
import { readNotificationAsync } from '../../../../store/reducers/notification';


export default function ReadNotificationScreen({navigation, route}){
    const {id} = route.params;
    const {colors, dark} = useTheme();
    const current = useSelector(state => state.notifications.notifications?.find(({id: notId}) => notId===id));
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readNotificationAsync({...current,user: user?.pk, read: true}));
        navigation.setOptions({
            title: current?.title,
        })
    }, []);
    
    return (
        <View style={{flex: 1, backgroundColor: dark? colors.background :colors.card}}>
            <View style={{ padding: 20}}>
                <Text 
                    style={{
                        color: colors.text, 
                        lineHeight: 30, 
                        fontFamily: 'OpenSans_400Regular'
                    }}
                >
                    {current?.body}
                </Text>
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.background} />
        </View>
    );
}