import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Money } from '../money';

export const MotorDetails = ({data}) => {
    console.log(data)
    return (
        <View>
            <Text style={styles.bodyHeader}>Policy Information</Text>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1]}>Vehicle Value</Text>
                <Money style={[styles.info]} amount={parseFloat(data?.value).toFixed(2)} />
            </View>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1]}>Vehicle Model</Text>
                <Text style={[styles.info]}> {data?.vehicle_model} </Text>
            </View>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1]}>Registration Number</Text>
                <Text style={[styles.info]}> {data?.registration_number} </Text>
            </View>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1]}>Engine Number</Text>
                <Text style={[styles.info]}> {data?.engine_number} </Text>
            </View>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1]}>Chassis Number</Text>
                <Text style={[styles.info]}> {data?.chasis_number} </Text>
            </View>
            <View style={[styles.infoView]}>
                <Text style={[styles.info1]}>Vehicle Class</Text>
                <Text style={[styles.info]}> {data?.vehicle_model} </Text>
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