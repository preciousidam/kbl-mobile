import React, { useState } from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Money } from '../money';
import { retrievePolicyAsync } from '../../store/reducers/policy';
import { isNewPolicy } from '../../utility';
import { Modal } from 'react-native';
import { Button } from 'react-native';


export const PolicyList = ({}) => {
    
    const {policies, processing} = useSelector(state => state.policies);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const {navigate} = useNavigation();
    
    const refresh = () => {
        dispatch(retrievePolicyAsync(user.pk));
    }
    
    const renderItems = ({item, index}) => (
        <Activity
            {...item}
            index={index}
            onPress={_ => navigate("new_policy", {screen: 'polDet', params: {pn: item.policy_number}})}
        />);

    return(
        <View style={styles.container}>
           <FlatList
                refreshing={processing}
                onRefresh={refresh}
                data={policies}
                keyExtractor={(item,i) => item.policy_number+i}
                renderItem={renderItems}
                contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 50,}}
                ListEmptyComponent={Empty}
            />
        </View>
    )
}

export default PolicyList;

export const Empty = _  => {
    return (
        <View style={{
            minHeight: Dimensions.get('window').height - 150, 
            flex: 1, 
            backgroundColor: '#fff', 
            alignItems: 'center', 
            justifyContent: 'center'
        }}>
            <Image style={{width: 100, height: 100}} source={require('../../assets/no_data.png')} />
            <Text style={{fontFamily: 'Montserrat_700Bold', color: '#A6A6A6'}}>Nothing to see here!</Text>
        </View>
    )
}

export const Activity = ({icon, premium, policy_number, valid_till, onPress, is_active, last_modified, index}) => {
    const {colors, dark} = useTheme();
    const indicator = [ colors['danger'], colors['success'], colors['warning']]
    const expired = is_active ? 1 : 0;
    const isNew = isNewPolicy(last_modified)
   

    const icn = expired == 0? <MaterialCommunityIcons name="shield-off" size={35} color={indicator[expired]} />:
        <MaterialCommunityIcons name="shield-check" size={35} color={indicator[expired]} />;
    return (
        <TouchableOpacity activeOpacity={.8} onPress={onPress}>
            <View style={[styles.update, {backgroundColor: colors.card}]}>
                <View style={styles.amount}>
                    {icon}
                    <Money style={styles.bold} amount={parseFloat(premium).toFixed(2)} />
                    {is_active && isNew && <Text style={[styles.new, {backgroundColor: colors.warning}]}>New</Text>}
                </View>
                <View style={{marginVertical: 10,}}>
                    <Text style={styles.bold}>{policy_number}</Text>
                </View>
                <Text style={{color: '#858585', fontSize: 13,}}>Valid Till: {moment(valid_till).format('lll')}</Text>
                <Text style={styles.shield}>{icn}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginVertical: 20,
        marginTop: 10,
    },
    update: {
        padding: 15,
        width: '100%',
        marginVertical: 5,
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 10,
        elevation: 2,
        position: "relative",
    },
    updateText: {
        fontFamily: 'Montserrat_700Bold', 
    },
    amount:{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    bold: {
        fontFamily: 'OpenSans_700Bold',
    },
    shield: {
        position: "absolute",
        right: 15,
        top: '50%'
    },
    new: {
        padding: 5,
        paddingVertical: 2,
        fontFamily: 'Montserrat_700Bold',
        fontSize: 11,
        borderRadius: 5,
        color: '#fff',
    },
});