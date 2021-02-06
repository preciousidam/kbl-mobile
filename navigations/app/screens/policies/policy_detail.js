import { useTheme } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import moment from 'moment';
import { Money } from '../../../../components/money';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { CommaFormatted } from '../../../../utility';
import { Solidbutton, Outlinedbutton } from '../../../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { MotorDetails } from '../../../../components/details/motor';
import { HomeDetails } from '../../../../components/details/home';
import { Alert } from 'react-native';
import { edit } from '../../../../store/reducers/policy';

const vInfo = {
    'Value': '5000000.00',
    'Vehicle Model': 'Bentley',
    'Vehicle Make': 'Another Bentley',
    'Registration Number': 123456789,
    'Engine Number': 123456,
    'Chassis Number': 234567,
    'Vehicle Class': 'Private Vehicle / Car',
}

export const PolicyDetails = ({navigation, route}) => {
    const {colors, dark} = useTheme();
    const {pn} = route?.params;
    const dispatch = useDispatch();
    
    const policy = useSelector(state => state?.policies?.policies.find(({policy_number}) => policy_number == pn))

    const product = useSelector(state => state.app?.products?.find(({id}) => id === policy?.product))

    const renew = _ => {
        if (policy.is_active)
            Alert.alert('Renewal', 'Can not renew policy! policy still active')
        else{
            dispatch(edit({...policy}));
            navigation.navigate('payOpt');
        }
        
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} data={policy} />
            <View style={[styles.body, {backgroundColor: colors.card}]}>
                {product?.category === 'Motor'?
                    <MotorDetails pn={policy.policy_number} />:
                    <HomeDetails pn={policy.policy_number} />}
            </View>
            <View style={[styles.footer]}>
                <View  style={{flex: 1, paddingRight: 5}}>
                    <Solidbutton 
                        onPress={_ => Alert.alert('Certificate', 'Not Available for download yet')} 
                        text="Certificate" 
                    />
                </View>
                <View style={{flex: 1, paddingLeft: 5}}>
                    <Outlinedbutton onPress={renew} text="Renew" style={{width: '100%'}} textStyle={{color: colors.primary}} />
                </View>
            </View>
            <FocusAwareStatusBar barStyle={!dark? 'light-content': 'dark-content' } backgroundColor={colors.primary} />
        </View>
    )
}

export const Header = ({navigation, data}) => {
    const {colors, dark} = useTheme();
    const product = useSelector(state => state.app?.products?.find(({id}) => id === data?.product))

    useEffect(() => {
        navigation.setOptions({
            title: product?.name
        })
    })
    return (
        <View style={[styles.header, {backgroundColor: colors['primary']}]}>

            <View>
                <Text style={styles.premiumText}>Premium Payable</Text>
                <Money amount={parseFloat(data?.premium).toFixed(2)} style={styles.premium} />
            </View>

            <View style={styles.hCont}>
                <View style={styles.info}>
                    <Text style={styles.span}>Status</Text>
                    <Text style={styles.p}>{data.is_active?'Active': 'In-Active'}</Text>
                </View>
                <View style={[styles.info, styles.middle]}>
                    <Text style={styles.span}>Policy No.</Text>
                    <Text style={styles.p}>{data.policy_number}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.span}>End Date</Text>
                    <Text style={[styles.p, {fontSize: 12}]}>{moment(data.valid_till).format('lll')}</Text>
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