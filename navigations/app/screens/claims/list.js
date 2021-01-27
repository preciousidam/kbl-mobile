import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { ActionHeader } from '../../../../components/header';
import PolicyList from '../../../../components/claims/claims';
import FocusAwareStatusBar from '../../../../components/statusBar';


export const CliamListView = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    return (
        <View style={{flex: 1}}>
            <ActionHeader name="Claims" onPress={_ => navigate('new', {id: null})} />
            <PolicyList onItemPress={id => navigate('polDet', {id})} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}