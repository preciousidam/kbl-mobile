import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text, View, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {  CardInputWithIcon, CardNumberInputWithIcon } from '../input/card';
import { Ionicons } from '@expo/vector-icons';
import { Money } from '../money';
import { useState } from 'react';

export const CardForm = ({platform}) => {
    const {colors, dark} = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const [cNumber, setCNumber] = useState('')

    return (
        <View style={[styles.container, {backgroundColor: colors.card}]}>
            <View>
                <Text style={styles.header}>Checkout</Text>
                <Text style={styles.subHeader}>With {platform}</Text>
            </View>
            

            <View style={styles.form}>
                <Text style={styles.label}>Card Number</Text>
                <CardNumberInputWithIcon 
                    style={styles.input}
                    placeholder="0000 0000 0000 0000"
                    value={cNumber}
                    onChangeText={({nativeEvent}) => setCNumber(nativeEvent.text)}
                />
                <View style={styles.cvv}>
                    <View style={{flex: 1, marginRight: 5}}>
                        <Text style={styles.label}>Expiration Date</Text>
                        <CardInputWithIcon 
                            style={styles.input}
                            placeholder="12/23"
                            
                        />
                    </View>
                    <View style={{flex: 1, marginLeft: 5}}>
                        <Text style={styles.label}>CVV</Text>
                        <CardInputWithIcon 
                            style={styles.input}
                            placeholder="2341"
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                <Text style={{textAlign: 'center', marginVertical: 20, fontFamily: 'OpenSans_400Regular'}}>
                    By enable auto billing you will be charged 
                        you current premium rate at upon expiration of this payment.
                </Text>
            </View>
            <TouchableOpacity style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <View style={[styles.action, {backgroundColor: colors.success}]}>
                    <Text style={styles.actionText}>Pay <Money amount='100000.00' /></Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        position: 'absolute',
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