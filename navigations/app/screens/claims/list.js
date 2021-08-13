import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { ActionHeader } from '../../../../components/header';
import PolicyList from '../../../../components/claims/claims';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveClaimAsync } from '../../../../store/reducers/claims';


export const CliamListView = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    
    
    useEffect(() => {
        dispatch(retrieveClaimAsync(user?.pk))
    },[])

    return (
        <View style={{flex: 1}}>
            <ActionHeader name="Claims" onPress={_ => navigate("new_claim", { screen: 'new', params:{id: null}})} />
            <PolicyList onItemPress={id => navigate('polDet', {id})} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}