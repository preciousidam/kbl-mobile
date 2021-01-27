import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { ActionHeader } from '../../../../components/header';
import PolicyList from '../../../../components/policy/policy';
import FocusAwareStatusBar from '../../../../components/statusBar';


export const PolicyListView = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    return (
        <View style={{flex: 1}}>
            <ActionHeader name="Coverage" onPress={_ => navigate('new_policy', { screen: 'new', params:{id: null}})} />
            <PolicyList onItemPress={id => navigate('polDet', {id})} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}