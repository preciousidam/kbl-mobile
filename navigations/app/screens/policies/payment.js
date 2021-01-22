import { useTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, StyleSheet, View, Modal} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Solidbutton, SolidbuttonWithIcon } from '../../../../components/button';
import { Money } from '../../../../components/money';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { CardForm } from '../../../../components/form/payment';


export const PaymentOptionView = ({navigation}) => {
    const {colors, dark} = useTheme();
    const [visible, setVisible] = useState(false);
    const [pp, setPP] = useState("")
    const {navigate} = navigation;

    const onClick = id => {
        setPP(id);
        setVisible(true);
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
                <Divider />
                <SolidbuttonWithIcon
                    onPress={_ => onClick("PayStack")}
                    text="Paystack" gradColors={['#63E7F9','#00AFED' ]} icon={<FontAwesome name="money" size={16} color="#fff" />} 
                />
                <Divider />
                <SolidbuttonWithIcon 
                    onPress={_ => onClick("QuickTeller")} 
                    text="Quickteller" gradColors={['#5DA6E8','#004FB4' ]} icon={<FontAwesome name="money" size={16} color="#fff" />} 
                />
                
            </View>
            <Modal
                transparent={false}
                visible={visible}
                onRequestClose={_ => setVisible(false)}
            >
                <CardForm platform={pp} />
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
    }
})