import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import getLoginClient from '../../apiAuth/loggedInClient';
import { restore } from '../../store/reducers/auth';
import { Money } from '../money';

export const HomeDetails = ({pn}) => {

    const [data, setData] = useState({});

    const getPolicyDetail = async _ => {
        const client = await getLoginClient()

        try{
            const {data,status} = await client.get(`policy/${pn}/`);
            console.log(data)
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
            <Text style={styles.bodyHeader}>Policy Information</Text>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1]}>Plan</Text>
                <Text style={[styles.info]}> {data?.plan} </Text>
            </View>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1]}>Building Type</Text>
                <Text style={[styles.info]}> {data?.building_type} </Text>
            </View>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1]}>Address</Text>
                <Text style={[styles.info]}> {data?.address} </Text>
            </View>
            
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
    }
});