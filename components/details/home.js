import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import getLoginClient from '../../apiAuth/loggedInClient';
import { restore } from '../../store/reducers/auth';
import { Money } from '../money';

export const HomeDetails = ({pn}) => {

    const [data, setData] = useState({});
    const {colors} = useTheme();

    const getPolicyDetail = async _ => {
        const client = await getLoginClient()

        try{
            const {data,status} = await client.get(`policy/${pn}/`);
           
            if (status === 200 || status === 201){
                setData(data);
                return;
            }
            if(status === 401){
                Alert.alert('Token Expired', 'Please login again to continue.')
                dispatch(restore({user: null}));
                return;
            }
            
            
            for (let item in data){
                showMessage({
                    type: 'danger',
                    description: data[item],
                    message: item,
                    icon: 'auto',
                    duration: 3000,
                    hideStatusBar: true,
                })
            }
            
            return;
        }
        catch (err){
            console.log(err)
            showMessage({
                type: 'danger',
                message: "Something happened",
                description: err.message,
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
        }
    }

    useEffect(() => {
        getPolicyDetail();
    }, [pn])
    
    return (
        <View>
            {data.is_active === false && <Text style={[styles.error,{color: colors.danger}]}>
                * {data.valid_till == null ? 'This policy is inactive as you did not complete payment. click payment button to activate.':
                    "This policy has expired. click renew button to activate."}
            </Text>}
            <Text style={[styles.bodyHeader, {color: colors.text}]}>Policy Information</Text>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1, {color: colors.text}]}>Plan</Text>
                <Text style={[styles.info, {color: colors.text}]}> {data?.plan} </Text>
            </View>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1, {color: colors.text}]}>Building Type</Text>
                <Text style={[styles.info, {color: colors.text}]}> {data?.building_type} </Text>
            </View>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1, {color: colors.text}]}>Address</Text>
                <Text style={[styles.info, {color: colors.text}]}> {data?.address} </Text>
            </View>
            <Text style={[styles.info1, {color: colors.text}]}>All Items</Text>
            {data?.items && data?.items.map(({item,value}, index) => 
                <View key={item} style={[styles.infoView]}>
                    <Text style={[styles.info1, {color: colors.text}]}>{item}</Text>
                    <Money style={[styles.info, {color: colors.text}]} amount={parseFloat(value).toFixed(2)} />
                </View>
            )}
        </View>
        
    )
}

const styles = StyleSheet.create({
    bodyHeader: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 13,
    },
    infoView: {
        marginVertical: 10,
    },
    info1: {
        fontFamily: 'OpenSans_700Bold',
    },
    info: {
        fontFamily: 'OpenSans_400Regular',
    },
    error: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 11,
        marginVertical: 15
    }
});