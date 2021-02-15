import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Text } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Solidbutton } from '../../../components/button';
import { OutlinedInputWithIcon } from '../../../components/input';

import FocusAwareStatusBar from '../../../components/statusBar';
import client from '../../../apiAuth/guestClient';
import { showMessage } from 'react-native-flash-message';
import { ActInd } from '../../../components/activityIndicator';

export const Reset = props => {
    const {top, bottom} = useSafeAreaInsets();
    const {colors, dark} = useTheme();
    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false);

    const reset = async _ => {
        setProcessing(true);
        try{
            const {data, status} = await client.post(`auth/password/reset/`,{email})
            setProcessing(false);
            if (status === 200 || status === 201){
                showMessage({
                    type: 'success',
                    message: data.detail,
                    duration: 3000,
                    icon: 'success',
                    hideStatusBar: true,
                })
                return;
            }

            if(status === 500){
                showMessage({
                    type: "danger",
                    message: "Something happened cannot process your request at the moment.",
                    icon: 'auto',
                    duration: 3000,
                    hideStatusBar: true,
                })
                return;
            }
            
            for (let item in data){
                showMessage({
                    type: 'danger',
                    message: data[item],
                    icon: 'auto',
                    duration: 3000,
                    hideStatusBar: true,
                })
            }
        }
        catch(err){
            setProcessing(false);
            console.error(err)
            dispatch(error(true));
            showMessage({
                type: 'danger',
                message: "Something happened",
                description: err.message,
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            });
        }
    }
    
    return (
        <View style={[styles.container, 
            {paddingBottom: bottom+ 20, paddingTop: top+100, backgroundColor: dark? colors.background:colors.card}]}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios'? "padding": "position"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
            >
                <Text style={[styles.headerText, {color: colors.text}]}>
                    Enter an email address associated with your account and we'll send you instructions
                    to reset your password.
                </Text>
                <OutlinedInputWithIcon 
                    icon={<MaterialIcons name="mail-outline" color={colors.primary} size={24} />}
                    placeholder="Provide your Email address"
                    contProps={styles.textInput}
                    value={email}
                    onChangeText={({nativeEvent}) => setEmail(nativeEvent.text)}
                />
                
                <Solidbutton
                    text="Reset"
                    style={styles.button}
                    onPress={reset}
                />
                
            </KeyboardAvoidingView>
            <ActInd status={processing} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content'} backgroundColor={colors.card} />
        </View>
    )
} 

export default Reset;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingHorizontal: 20,
    },
   
    headerText: {
        fontFamily: 'OpenSans_400Regular',
        marginVertical: 10,
    },
    button: {
        width: '100%',
        marginVertical: 10,
    },
    textInput: {
        marginVertical: 30,
    },

})