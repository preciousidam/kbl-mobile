import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { ActionHeader } from '../../../../components/header';
import PolicyList from '../../../../components/list/policy';
import FocusAwareStatusBar from '../../../../components/statusBar';


export const PolicyListView = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    return (
        <View style={{flex: 1}}>
            <ActionHeader name="Coverage" onPress={_ => navigate('new', {id: null})} />
            <PolicyList />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}