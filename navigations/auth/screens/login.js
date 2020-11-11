import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Text, Alert } from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';


import { Solidbutton } from '../../../components/button';
import { OutlinedInput, OutlinedInputWithIcon } from '../../../components/input';
import FocusAwareStatusBar from '../../../components/statusBar';


export const Login = ({navigation}) => {
    const {top, bottom, right, left} = useSafeAreaInsets();
    const {colors, dark} = useTheme();
    const {navigate} = navigation;

    const biometric = async _ => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        let supported;
        let enrolled;
        let authenticated = '';
        if (hasHardware)
            supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
        else
            Alert.alert('Device does not support biometrics')

        if (1 in supported)
            enrolled = await LocalAuthentication.isEnrolledAsync()
        else
            Alert.alert('Fingerprint not supported')

        if(enrolled){
            authenticated = await LocalAuthentication.authenticateAsync({
                disableDeviceFallback: true,
                cancelLabel: 'Cancel'
            });
            if(authenticated.success)
                Alert.alert('Success','Login Successful')
            if (authenticated.error)
                Alert.alert("Error",'Could not login in with fingerprint')
        }
        
    }

    return (
        <View 
            style={[styles.container, 
                    {paddingBottom: bottom+ 20, paddingTop: top}]}>   
            <ScrollView contentContainerStyle={{flex: 1}}>
                <View style={styles.view}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios'? "padding": "position"}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
                    >
                        <View style={styles.header}>
                            <Image source={require('../../../assets/logo.png')} />
                        </View>
                        <OutlinedInputWithIcon 
                            icon={<MaterialIcons name="mail-outline" color={colors.primary} size={24} />}
                            placeholder="Email"
                            contProps={styles.textInput}
                        />

                        <OutlinedInputWithIcon 
                            icon={<MaterialIcons name="lock-outline" color={colors.primary} size={24} />}
                            placeholder="Password"
                            contProps={styles.textInput}
                        />
                        
                        <Solidbutton
                            text="Login"
                            style={styles.button}
                        />
                        <View style={styles.forgotCont}>
                            <Text style={styles.forgot} onPress={_ => navigate('Reset')}>Forgot password?</Text>
                            <Text style={styles.forgot} onPress={_ => biometric()}>Fingerprint Login</Text>
                        </View>
                    
                    </KeyboardAvoidingView>
                    <View style={styles.bottom}>
                        <Text style={styles.link}>
                            Don't have an account? 
                            <Text style={styles.inner} onPress={() => navigate('Register')}> Register</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content'} backgroundColor={colors.background} />
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    avoidingView: {
        flex: 1,
        height: '100%',
    },
    view: {
        flex: 1,
        width: '100%',
        justifyContent: "space-between",
    },
    header: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 100,
    },
    link: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 14,
    },
    inner: {
        fontFamily: 'OpenSans_700Bold',
        textDecorationLine: 'underline',
    },
    button: {
        width: '100%',
        marginVertical: 10,
    },
    textInput: {
        marginVertical: 15,
    },
    bottom: {
        justifyContent: 'center',
        alignItems: "center",
    },
    forgotCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    forgot: {
        fontFamily: 'Montserrat_400Regular',
        marginVertical: 10,
    },
})