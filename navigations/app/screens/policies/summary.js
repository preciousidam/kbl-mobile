import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Solidbutton } from '../../../../components/button';
import { Money } from '../../../../components/money';
import FocusAwareStatusBar from '../../../../components/statusBar';

const vInfo = {
    'Vehicle Model': 'Bentley',
    'Vehicle Make': 'Another Bentley',
    'Registration Number': 123456789,
    'Engine Number': 123456,
    'Chassis Number': 234567,
    'Vehicle Class': 'Private Vehicle / Car',
    'Vehicle Value': '5000000.00',
}

export const SummaryView = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <Header premium={'100000'} />
                <View style={[styles.product, {backgroundColor: colors.card}]}>
                    <Text style={[styles.pHeader, {color: colors.text}]}>Product</Text>
                    <Text style={[styles.pTitle, {color: colors.text}]}>Third-Party Motor Insurance</Text>
                </View>
                <View style={[styles.product, {backgroundColor: colors.card}]}>
                    <Text style={[styles.pHeader, {color: colors.text}]}>Vehicle Information</Text>
                    {Object.entries(vInfo).map(info => (
                        <View style={[styles.infoView]}>
                            <Text style={[styles.info1]}>{info[0]}</Text>
                            <Text style={[styles.info]}>{info[1]}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={{padding: 15}}><Solidbutton text="Continue" onPress={e => navigate('payOpt')} /></View>
            <FocusAwareStatusBar barStyle={!dark? 'light-content': 'dark-content' } backgroundColor={colors.primary} />
        </View>
    )
}

export const Header = ({premium}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={[styles.header, {backgroundColor: colors.primary}]}>
            <Text style={[styles.headerT1]}>Premium Payable</Text>
            <Money amount={premium} style={[styles.headerT2]} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 15,
    },
    headerT1: {
        fontFamily: 'Montserrat_700Bold',
        color: '#fff',
        paddingVertical: 5,
    },
    headerT2: {
        fontFamily: 'Montserrat_700Bold',
        color: '#fff',
        paddingVertical: 5,
        fontSize: 20,
    },
    product: {
        margin: 10,
        elevation: 2,
        shadowOpacity: .2,
        padding: 10,
        borderRadius: 5,
    },
    pHeader:{
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 5,
    },
    pTitle:{
        fontFamily: 'OpenSans_400Regular',
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
})