import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActInd } from '../../../../components/activityIndicator';
import { ActionHeader } from '../../../../components/header';
import PolicyList from '../../../../components/policy/policy';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { retrievePolicyAsync } from '../../../../store/reducers/policy';


export const PolicyListView = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {processing} = useSelector(state => state.policies);
    
    useEffect(() => {
        dispatch(retrievePolicyAsync(user?.pk))
    },[])

    return (
        <View style={{flex: 1}}>
            <ActionHeader name="Coverage" onPress={_ => navigate('new_policy', { screen: 'new', params:{id: null}})} />
            <PolicyList onItemPress={id => navigate('polDet', {id})} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}