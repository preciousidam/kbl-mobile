import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import FocusAwareStatusBar from '../../../../components/statusBar';


export default function ReadNotificationScreen({navigation, route}){
    const {id} = route.params;
    const {colors, dark} = useTheme();
    const {body, time, title} = useSelector(state => state.notifications.find(({id: notId}) => notId===id));
    useEffect(() => {
        navigation.setOptions({
            title,
        })
    });
    
    return (
        <View style={{flex: 1, backgroundColor: dark? color.background :colors.card}}>
            <View style={{ padding: 20}}>
                <Text 
                    style={{
                        color: colors.text, 
                        lineHeight: 30, 
                        fontFamily: 'OpenSans_400Regular'
                    }}
                >
                    {body}
                </Text>
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.background} />
        </View>
    );
}