import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { useTheme } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { Money } from '../../../../components/money';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { CommaFormatted } from '../../../../utility';
import { Solidbutton, Outlinedbutton } from '../../../../components/button';

const vInfo = {
    'Value': '5000000.00',
    'Vehicle Model': 'Bentley',
    'Vehicle Make': 'Another Bentley',
    'Registration Number': 123456789,
    'Engine Number': 123456,
    'Chassis Number': 234567,
    'Vehicle Class': 'Private Vehicle / Car',
}

export const PolicyDetails = ({navigation}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={[styles.body, {backgroundColor: colors.card}]}>
                <Text style={styles.bodyHeader}>Policy Information</Text>
                {Object.entries(vInfo).map(info => (
                    <View style={[styles.infoView]}>
                        <Text style={[styles.info1]}>{info[0]}</Text>
                        {info[0] === 'Value'? <Money amount={info[1]} style={{fontFamily: 'OpenSans_700Bold'}} /> : 
                            <Text style={[styles.info]}>{info[1]}</Text>}
                    </View>
                ))}
            </View>
            <View style={[styles.footer]}>
                <View  style={{flex: 1, paddingRight: 5}}>
                    <Solidbutton text="Certificate" />
                </View>
                <View style={{flex: 1, paddingLeft: 5}}>
                    <Outlinedbutton text="Renew" style={{width: '100%'}} textStyle={{color: colors.primary}} />
                </View>
            </View>
            <FocusAwareStatusBar barStyle={!dark? 'light-content': 'dark-content' } backgroundColor={colors.primary} />
        </View>
    )
}

export const Header = ({navigation}) => {
    const {colors, dark} = useTheme();

    useEffect(() => {
        navigation.setOptions({
            title: 'Third-Party Vehicle'
        })
    })
    return (
        <View style={[styles.header, {backgroundColor: colors['primary']}]}>

            <View>
                <Text style={styles.premiumText}>Premium Payable</Text>
                <Money amount={'5000.00'} style={styles.premium} />
            </View>

            <View style={styles.hCont}>
                <View style={styles.info}>
                    <Text style={styles.span}>Status</Text>
                    <Text style={styles.p}>Active</Text>
                </View>
                <View style={[styles.info, styles.middle]}>
                    <Text style={styles.span}>Policy No.</Text>
                    <Text style={styles.p}>MBSN-123456789</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.span}>End Date</Text>
                    <Text style={styles.p}>20th July, 2020</Text>
                </View>
            </View>
        </View>
    )
}

export default PolicyDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        padding: 10,
    },
    premiumText: {
        fontSize: 11,
        color: '#fff',
        fontFamily: 'OpenSans_700Bold'
    },
    premium: {
        fontSize: 17,
        color: '#fff',
        fontFamily: 'Montserrat_700Bold'
    },
    hCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 0,
    },
    info: {
        paddingHorizontal: 10,
    },
    middle: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,.4)',
        paddingHorizontal: 10,
    },
    span: {
        fontSize: 11,
        fontFamily: "OpenSans_700Bold",
        color: '#fff'
    },
    p: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Montserrat_700Bold'
    },
    footer: {
        width: '100%',
        maxWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        flex: 1,
    },
    body: {
        flex: 8.5,
        width: '100%',
        borderRadius: 30,
        marginVertical: 15,
        padding: 15,
    },
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