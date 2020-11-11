import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Text } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Solidbutton } from '../../../components/button';
import { OutlinedInputWithIcon } from '../../../components/input';

import FocusAwareStatusBar from '../../../components/statusBar';

export const Reset = props => {
    const {top, bottom} = useSafeAreaInsets();
    const {colors, dark} = useTheme();
    
    return (
        <View style={[styles.container, 
            {paddingBottom: bottom+ 20, paddingTop: top+100, backgroundColor: colors.card}]}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios'? "padding": "position"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
            >
                <Text style={styles.headerText}>
                    Enter an email address associated with your account and we'll send you instructions
                    to reset your password.
                </Text>
                <OutlinedInputWithIcon 
                    icon={<MaterialIcons name="mail-outline" color={colors.primary} size={24} />}
                    placeholder="Provide your Email address"
                    contProps={styles.textInput}
                />
                
                <Solidbutton
                    text="Login"
                    style={styles.button}
                />
                
            </KeyboardAvoidingView>
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