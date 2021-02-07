import { useTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Text, Alert, Modal, ActivityIndicator } from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import { useDispatch, useSelector } from 'react-redux';
import { isAvailableAsync, getItemAsync } from 'expo-secure-store';


import { Solidbutton } from '../../../components/button';
import { EmailOutlinedInputWithIcon, OutlinedInput, OutlinedInputWithIcon, PasswordOutlinedInputWithIcon } from '../../../components/input';
import FocusAwareStatusBar from '../../../components/statusBar';
import {signIn} from '../../../store/reducers/auth';


export const Login = ({navigation}) => {
    const {top, bottom, right, left} = useSafeAreaInsets();
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.auth);
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
            if(authenticated.success){
                const secureStore = await isAvailableAsync();
                if (secureStore){
                    let username = await getItemAsync('username');
                    let password = await getItemAsync('password');
                    dispatch(signIn({username,password}));
                }
                else Alert.alert('Error', 'This device does not support Biometric authentication');
            }
            if (authenticated.error)
                Alert.alert("Error",'Could not login in with fingerprint')
        }
        
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onPress = _ => {
        dispatch(signIn({username: username.toLowerCase(),password}));
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
                        <EmailOutlinedInputWithIcon
                            icon={<MaterialIcons name="mail-outline" color={colors.primary} size={24} />}
                            contProps={styles.textInput}
                            value={username} 
                            onChangeText={({nativeEvent}) => setUsername(nativeEvent.text)}
                            style={styles.textInput}
                        />

                        <PasswordOutlinedInputWithIcon
                            icon={<MaterialIcons name="lock-outline" color={colors.primary} size={24} />}
                            contProps={styles.textInput}
                            value={password} 
                            onChangeText={({nativeEvent}) => setPassword(nativeEvent.text)}
                            style={styles.textInput} 
                        />
                        
                        <Solidbutton
                            text="Login"
                            style={styles.button}
                            onPress={onPress}
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={isLoading}
            >
                <View style={styles.modal}>
                    <View style={styles.indicator}><ActivityIndicator size="large" color={colors.info} /></View>
                </View>
            </Modal>
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
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    indicator: {
        width: 65,
        height: 65,
        padding: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 32,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: 'rgba(0,0,0,.3)'
    },
})