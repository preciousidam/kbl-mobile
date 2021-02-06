import { useTheme } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { View, Platform, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';


import { IDS, STATE } from '../../constants';
import { OutlinedInput, OutlinedInputWithIcon } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';
import { OutlinedDatePicker } from '../input/datepicker';
import {edit} from '../../store/reducers/kyc';
import { ImageUploader } from './motor';


export const KYCIndividualForm = ({}) => {

    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    
    const {kyc} = useSelector(state => state.kyc);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <OutlinedInput
                    placeholder="Full Name"
                    style={styles.input}
                    value={ kyc.name|| `${user?.first_name} ${user?.last_name}`}
                    onChangeText={({nativeEvent}) => dispatch(edit({...kyc, name: nativeEvent.text}))}
                />
                <OutlinedInput
                    placeholder="Email"
                    style={styles.input}
                    value={kyc.email || user?.email}
                    onChangeText={({nativeEvent}) => dispatch(edit({...kyc, email: nativeEvent.text}))}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <OutlinedInputWithIcon
                    icon={<Text>+234</Text>}
                    placeholder="Phone" 
                    style={styles.input}
                    keyboardType='phone-pad'
                    textContentType='telephoneNumber'
                    contProps={styles.input}
                    value={kyc.phone}
                    onChangeText={({nativeEvent}) => dispatch(edit({...kyc, phone: nativeEvent.text}))}
                />
                <OutlinedInput
                    placeholder="Address"
                    style={styles.input}
                    value={kyc.address}
                    onChangeText={({nativeEvent}) => dispatch(edit({...kyc, address: nativeEvent.text}))}
                />
                <Picker
                    prompt="State"
                    options={STATE} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={null}
                    onValueChange={(item,i) => dispatch(edit({...kyc, state: item}))}
                    value={kyc.state}
                />
                <Picker
                    prompt="Gender"
                    options={['Male', 'Female']} 
                    style={{padding: 0, marginVertical: 10,}}
                    onValueChange={(item,i) => dispatch(edit({...kyc, gender: item}))}
                    value={kyc.gender || 'Male'}
                />
                <OutlinedInput
                    placeholder="Policy Number"
                    style={styles.input}
                    value={kyc.policy_number}
                    onChangeText={({nativeEvent}) => dispatch(edit({...kyc, policy_number: nativeEvent.text}))}
                />
                <Text style={styles.help}>Date of Birth</Text>
                <OutlinedDatePicker
                    placeholder="YYYY-MM-DD"
                    style={styles.input}
                    value={kyc.dob || new Date()}
                    onChangeText={value => dispatch(edit({...kyc, dob: value}))}
                />
                
                <OutlinedInput
                    placeholder="Occupation"
                    style={styles.input}
                    value={kyc.occupation}
                    onChangeText={({nativeEvent}) => dispatch(edit({...kyc, occupation: nativeEvent.text}))}
                />
                <Text style={{fontFamily: 'Montserrat_700Bold', marginVertical: 15,}}>Identification</Text>
                <Picker
                    prompt="Type of ID"
                    options={IDS} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={kyc.id_type || "Type of ID"}
                    onValueChange={(item,i) => dispatch(edit({...kyc, id_type: item}))}
                />
                <OutlinedInput
                    placeholder="ID Number"
                    style={styles.input}
                    value={kyc.id_number}
                    onChangeText={({nativeEvent}) => dispatch(edit({...kyc, id_number: nativeEvent.text}))}
                />
                <Text style={styles.help}>Date Issued</Text>
                <OutlinedDatePicker
                    placeholder="YYYY-MM-DD"
                    style={styles.input}
                    value={kyc.issued_at || new Date()}
                    onChangeText={value => dispatch(edit({...kyc, issued_at: value}))}
                />
                <Text style={styles.help}>Expiry Date</Text>
                <OutlinedDatePicker
                    placeholder="YYYY-MM-DD"
                    style={styles.input}
                    value={kyc.expired_at || new Date()}
                    onChangeText={value => dispatch(edit({...kyc, expired_at: value}))}
                />
                <ImageUploader 
                    text="Upload image of valid ID card"
                    image={kyc.id_image}
                    callback={image => dispatch(edit({...kyc, id_image: image}))}
                />
                <Text style={styles.help}>Signature</Text>
                <ImageUploader 
                    text="Upload image of your signature"
                    image={kyc.signature}
                    callback={image => dispatch(edit({...kyc, signature: image}))}
                />
                
            </KeyboardAvoidingView>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 10,
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 150,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
    },
    help: {
        fontSize: 12,
    }
})