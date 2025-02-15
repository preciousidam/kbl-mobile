import { useTheme } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import moment from 'moment';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import { Money } from '../../../../components/money';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { CommaFormatted } from '../../../../utility';
import { Solidbutton, Outlinedbutton } from '../../../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { MotorDetails } from '../../../../components/details/motor';
import { HomeDetails } from '../../../../components/details/home';
import { Alert } from 'react-native';
import { edit } from '../../../../store/reducers/policy';
import { Linking } from 'react-native';
import { ScrollView } from 'react-native';


export const PolicyDetails = ({navigation, route}) => {
    const {colors, dark} = useTheme();
    const {pn} = route?.params;
    const dispatch = useDispatch();
    
    const policy = useSelector(state => state?.policies?.policies.find(({policy_number}) => policy_number == pn))

    const product = useSelector(state => state.app?.products?.find(({id}) => id === policy?.product))

    const renew = _ => {
        if (policy?.is_active)
            Alert.alert('Renewal', 'Can not renew policy! policy still active')
        else{
            dispatch(edit({...policy}));
            navigation.navigate('payOpt');
        }
        
    }

    useEffect(() => {
        totalPaid(policy);
    },[policy])

    const totalPaid = pol => {
        const startDate = pol?.created_at
        const payments = pol?.payments?.filter(({start}) => new Date(start) >= new Date(startDate))
        
        let total = 0
        for (let pay of payments){
            
            total += pay.amount;
        }
        
        return parseFloat(total).toFixed(2) || '0.00';
    }

    const view_cert = _ => {
        if(policy?.is_active) {
            Linking.openURL(policy?.certificate[policy?.certificate?.length -1].certificate)
            .catch((err) =>{
                console.log(err)
                Alert.alert('Something Happened', "Cannot view certificate at the moment try later.")
            })
        }else{
            Alert.alert('Certificate', 'Not Available for download yet')
        }
    }
    

    return (
        <View style={styles.container}>
            <Header navigation={navigation} data={policy} />
            <View style={[styles.body, {backgroundColor: colors.card}]}>
                <ScrollView>
                    <View style={[styles.payment, {borderColor: colors.success}]}>
                        <View style={[styles.info]}>
                            <Text style={[styles.span, styles.paymentSpan, {color: colors.text}]}>Payment Plan</Text>
                            <Text style={[styles.p, styles.paymentP, {color: colors.text}]}>{policy?.duration}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={[styles.span, styles.paymentSpan, {color: colors.text}]}>Total Paid</Text>
                            <Money style={[styles.p, styles.paymentP, {color: colors.text}]} amount={totalPaid(policy)} />
                        </View>
                    </View>
                    {product?.category === 'Motor' && <MotorDetails pn={policy?.policy_number} />}
                    {product?.category === 'Home' && <HomeDetails pn={policy?.policy_number} />}
                </ScrollView>
            </View>
            <View style={[styles.footer]}>
                <View  style={{flex: 1, paddingRight: 5}}>
                    <Solidbutton 
                        onPress={view_cert} 
                        text="Certificate" 
                    />
                </View>
                <View style={{flex: 1, paddingLeft: 5}}>
                    <Outlinedbutton onPress={renew} text={policy?.valid_till == null?"Payment": "Renew"} style={{width: '100%'}} textStyle={{color: colors.primary}} />
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
                    {data.is_active && <Text style={[styles.p, {fontSize: 12}]}>{moment(data.valid_till).format('lll')}</Text>}
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
    payment: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: hp('3%'),
        borderWidth: 1,
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp('2%'),
        borderRadius: wp('2%')
    },
    paymentSpan: {
        fontSize: wp('3.2%'),
        fontFamily: 'Montserrat_700Bold'
    },
    paymentP: {
        fontSize: wp('3.2%'),
        fontFamily: 'OpenSans_400Regular'
    },
    header: {
        width: '100%',
        padding: 10,
    },
    premiumText: {
        fontSize: wp('2.9%'),
        color: '#fff',
        fontFamily: 'OpenSans_700Bold'
    },
    premium: {
        fontSize: wp("4.5%"),
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
        fontSize: wp('2.5%'),
        fontFamily: "OpenSans_700Bold",
        color: '#fff'
    },
    p: {
        fontSize: wp('3.3%'),
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