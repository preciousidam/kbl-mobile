import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text, View, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {  CardDateInputWithIcon, CardInputWithIcon, CardNumberInputWithIcon } from '../input/card';
import { Ionicons } from '@expo/vector-icons';
import { Money } from '../money';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

export const CardForm = ({platform, amount, onPress, processing, msg}) => {
    const {colors, dark} = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const [cNumber, setCNumber] = useState('')
    const [cvv, setCVV] = useState('');
    const [valid_till, setValid_till] = useState('')
    const [pin, setPin] = useState('')

    return (
        <View style={[styles.container, {backgroundColor: colors.card}]}>
            
            

            <View style={styles.form}>
                <View>
                    <Text style={styles.header}>Checkout</Text>
                    <Text style={styles.subHeader}>With {platform}</Text>
                    {msg != 0 && <Text style={[styles.subHeader, {color: colors.danger}]}>{msg}</Text>}
                </View>
                <Text style={styles.label}>Card Number</Text>
                <CardNumberInputWithIcon 
                    style={styles.input}
                    placeholder="0000 0000 0000 0000"
                    value={cNumber}
                    onChangeText={({nativeEvent}) => setCNumber(nativeEvent.text)}
                    keyboardType="numeric"
                    textContentType="creditCardNumber"
                />
                <View style={styles.cvv}>
                    <View style={{flex: 1, marginRight: 5}}>
                        <Text style={styles.label}>Expiration Date</Text>
                        <CardDateInputWithIcon 
                            style={styles.input}
                            placeholder="12/23"
                            value={valid_till}
                            onChangeText={({nativeEvent}) => setValid_till(nativeEvent.text)}
                            keyboardType="numeric" 
                        />
                    </View>
                    <View style={{flex: 1, marginLeft: 5}}>
                        <Text style={styles.label}>CVV</Text>
                        <CardInputWithIcon 
                            style={styles.input}
                            placeholder="2341"
                            value={cvv}
                            onChangeText={({nativeEvent}) => setCVV(nativeEvent.text)}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.cvv}>
                    <View style={{flex: 1, marginRight: 5}}>
                        <Text style={styles.label}>Card Pin</Text>
                        <CardInputWithIcon 
                            style={styles.input}
                            placeholder="0000"
                            value={pin}
                            onChangeText={({nativeEvent}) => setPin(nativeEvent.text)}
                            keyboardType="numeric" 
                        />
                    </View>

                    <View style={{flex: 1, marginRight: 5}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15,}}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#767577" }}
                                thumbColor={isEnabled ? colors.success : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={_ => setIsEnabled(prev => !prev)}
                                value={isEnabled}
                            />
                            <Text>
                                {` Enable auto billing`}
                            </Text>
                        </View>
                    </View>
                </View>
                <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'OpenSans_400Regular'}}>
                    By enable auto billing you will be charged 
                        you current premium rate at upon expiration of this payment.
                </Text>
            </View>
            <TouchableOpacity 
                style={{ bottom: 0, width: '100%', zIndex: 1000}}
                onPress={() => !processing && onPress({cNumber, cvv, valid_till, pin})}
            >
                <View style={[styles.action, {backgroundColor: colors.success}]}>
                    <Text style={styles.actionText}>Pay <Money amount={amount} /></Text>
                    {processing && <ActivityIndicator size="large" color={colors.card}/>}
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        height: '100%'
    },
    header: {
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'center',
        color: '#A5A5A5',
        fontSize: 20,
    },
    subHeader: {
        fontFamily: 'Montserrat_400Regular',
        textAlign: 'center',
        color: '#A5A5A5',
        fontSize: 12,
        marginBottom: 40,
    },
    form: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        flex: 4,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 0,
        marginVertical: 5,
    },
    label: {
        fontFamily: 'OpenSans_700Bold',
    },
    cvv:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100%',
        marginVertical: 15,
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
    }
})