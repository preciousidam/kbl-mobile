import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, View, ScrollView, Platform, Modal} from 'react-native';
import FocusAwareStatusBar from '../../../../components/statusBar';

import { useDispatch, useSelector } from 'react-redux';
import { retrievePolicyAsync } from '../../../../store/reducers/policy';
import { Button } from 'react-native';


export const NewClaim = ({ navigation,route}) => {
    
    const {colors, dark} = useTheme();
    const {user} = useSelector(state => state.auth);
    const policies = useSelector(state => state.policies.policies.filter(x => x.is_active == true));
    const {products} = useSelector(state => state.app);
    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(retrievePolicyAsync(user?.pk));
    },[]);

    const category = {'Home': 'fire', 'Motor': 'motor'}

    const onPress = pNumber => {
        let p = policies.find(({policy_number}) => pNumber === policy_number);
        const {category: cat} = products.find(({id}) => id === p.product);
        let path = category[cat]
        navigation.navigate(path, {pn: pNumber});
    }


    if (policies.length <= 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginVertical: 15, fontFamily: 'OpenSans_700Bold'}}>No Active Policy</Text>
                <Button 
                    title="Get Insurance" 
                    onPress={_ => navigation.navigate('new_policy', { screen: 'new', params:{id: null}})} 
                />
            </View>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: colors.card}}>
            <ScrollView>
                <View style={styles.form}>
                    {policies.map(policy => 
                        <Text 
                            key={policy?.policy_number} 
                            style={styles.tButton} 
                            onPress={_ => onPress(policy?.policy_number)}
                        >
                            {policy?.policy_number} - <Text style={{color: colors.success}}>Active</Text>
                        </Text>
                    )}
                </View>
            </ScrollView>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

export default NewClaim;

const styles = StyleSheet.create({
    form: {
        flex: 1,
    },
    opt: {
        width: "100%",
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        backgroundColor: '#fff'
    },
    mHeader: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
    },
    tButton: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontFamily: 'OpenSans_700Bold',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.3)'
    },
});