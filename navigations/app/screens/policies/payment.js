import { useTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Solidbutton, SolidbuttonWithIcon } from '../../../../components/button';
import { Money } from '../../../../components/money';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { CardForm } from '../../../../components/form/payment';
import { useDispatch, useSelector } from 'react-redux';
import getLoginClient from '../../../../apiAuth/loggedInClient';
import { showMessage } from 'react-native-flash-message';
import { CardInputWithIcon } from '../../../../components/input/card';
import { validateCard } from '../../../../utility';
import { ActivityIndicator } from 'react-native';
import { reset } from '../../../../store/reducers/policy';

export const PaymentOptionView = ({navigation}) => {
    const {colors, dark} = useTheme();
    const [visible, setVisible] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [msg, setMsg] = useState('');
    const [otp, setOtp] = useState();
    const [pp, setPP] = useState("")
    const [processing, setProcessing] = useState(false);
    const {navigate} = navigation;
    const {form} = useSelector(state => state.policies);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [rData, setRData] = useState();
    const links = {i: {initiate:'pay/rave/', validate: 'pay/rave/validate/'}}

    const onClick = id => {
        setPP(id);
        setVisible(true);
    }
    const initiate = async card_details => {
        setProcessing(true);
        let details = {
            user_id: user.pk, 
            cardno: card_details.cNumber.replace(/\s+/g, ''), 
            cvv: card_details.cvv, 
            pin: card_details.pin,
            expirymonth: card_details.valid_till.split('/')[0],
            expiryyear: card_details.valid_till.split('/')[1],
            amount: form?.premium,
            policy_number: form?.policy_number,
        }

        if(!validateCard(details)){
            setMsg('Invalid card details!');
            setProcessing(false);
            return;
        }

        const client = await getLoginClient();
        const {data, status} = await client.post('pay/rave/', details)
        
        if(status === 201 || status === 200){
            if(data.code === '02'){
                setVisible(false);
                setShowOTP(true);
                setMsg(data.msg);
                setProcessing(false);
                setRData(data);
                return
            }
        }

        setProcessing(false);
        setMsg(data.msg)
        showMessage({
            type: 'error',
            message: data.status,
            description: data.msg,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        });
        return;
    }

    const validate = async _ => {
        if (processing) return;
        setProcessing(true);
        let details = {
            user_id: user?.pk, 
            otp,
            policy_number: form?.policy_number,
            amount: form?.premium,
            ref: rData?.ref,
        }

        if (otp === undefined) return;

        const client = await getLoginClient();
        const {data, status} = await client.post('pay/rave/validate/', details)
        
        if(status === 201 || status === 200){
            if(data.code === '00'){
                
                setShowOTP(false);
                setMsg('');
                setProcessing(false);
                showMessage({
                    type: 'success',
                    message: data.msg,
                    description: `Policy ${form?.policy_number} is now active`,
                    icon: 'auto',
                    duration: 5000,
                    hideStatusBar: true,
                })
                dispatch(reset());
                navigate('TabNav', {screen: 'Coverage'});
                return
            }
        }

        setProcessing(false);
        setMsg(data.msg)
        showMessage({
            type: 'error',
            message: data.status,
            description: data.msg,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        });
        return;
    }

    return (
        <View style={{flex: 1, backgroundColor: colors.card, padding: 10, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.info}>
                Complete Your transactions using one of the following payment platform
            </Text>

            <View style={styles.container}>
                <SolidbuttonWithIcon 
                    text="FlutterWave" icon={<FontAwesome name="money" size={16} color="#fff" />}
                    onPress={_ => onClick("FlutterWave")}
                />
                {/*<Divider />
                <SolidbuttonWithIcon
                    onPress={_ => onClick("PayStack")}
                    text="Paystack" gradColors={['#63E7F9','#00AFED' ]} icon={<FontAwesome name="money" size={16} color="#fff" />} 
                />*/}
                <Divider />
                <SolidbuttonWithIcon 
                    onPress={_ => onClick("QuickTeller")} 
                    text="Quickteller" gradColors={['#5DA6E8','#004FB4' ]} icon={<FontAwesome name="money" size={16} color="#fff" />} 
                />
                
            </View>
            <Modal
                transparent={false}
                visible={visible}
                onRequestClose={_ => {
                    setVisible(false);
                    setProcessing(false);
                }}>
                <CardForm 
                    platform={pp} 
                    amount={form?.premium?.toFixed(2)}  
                    onPress={initiate}
                    processing={processing}
                    msg={msg}
                />
            </Modal>
            <Modal
                transparent={false}
                visible={showOTP}
                onRequestClose={_ => setShowOTP(false)}
            >
                <View style={styles.form}>
                    <View style={{flex: 4, justifyContent: 'center'}}>
                        <Text style={[styles.subHeader, {color: colors.danger}]}>{msg}</Text>
                        <CardInputWithIcon 
                            placeholder="000000"
                            onChangeText={({nativeEvent}) => setOtp(nativeEvent.text)}
                            value={otp}
                            style={styles.input}
                            keyboardType="numeric"
                            textContentType="oneTimeCode"
                        />
                    </View>
                    <TouchableOpacity 
                        style={{ bottom: 0, width: '100%', marginVertical: 15}}
                        onPress={validate}
                    >
                        <View style={[styles.action, {backgroundColor: colors.success}]}>
                            <Text style={styles.actionText}>Submit</Text>
                            {processing && <ActivityIndicator size="large" color={colors.card}/>}
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
            <FocusAwareStatusBar barStyle={!dark? 'light-content': 'dark-content' } backgroundColor={colors.primary} />
        </View>
    )
}

export const Divider = _ => (
    <View style={styles.divider}>
        <View style={styles.line}></View>
        <Text style={styles.text}>OR</Text>
    </View>
) 


const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '100%'
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
        textAlign: 'center',
        marginVertical: 20,
    },
    divider: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    line: {
        width: '100%',
        height: 1.2,
        minHeight: 1.2,
        minWidth: '100%',
        backgroundColor: '#c6c6c6'
    },
    text: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#c6c6c6',
        padding: 7,
        backgroundColor: '#fff',
        borderRadius: 50,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 0,
        marginVertical: 5,
        width: '50%',
        alignSelf: 'center',
        textAlign: 'center'
    },
    label: {
        fontFamily: 'OpenSans_700Bold',
    },
    subHeader: {
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center',
        color: '#A5A5A5',
        fontSize: 12,
        marginBottom: 40,
    },
    action: {
        padding: 15,
        bottom: 0,
        width: '100%'
    },
    actionText: {
        color: '#fff',
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'center',
        elevation: 3,
        textAlignVertical: 'center',
    },
    form: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    }
})