import { useTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Text, Alert, Modal, ActivityIndicator } from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import { useDispatch, useSelector } from 'react-redux';
import { isAvailableAsync, getItemAsync } from 'expo-secure-store';
//import { wp, hp } from '../../../utility';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


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
                            <Image source={require('../../../assets/logo.png')} style={styles.image} />
                        </View>
                        <EmailOutlinedInputWithIcon
                            icon={<MaterialIcons name="mail-outline" color={colors.primary} size={wp("5%")} />}
                            contProps={styles.textInput}
                            value={username} 
                            onChangeText={({nativeEvent}) => setUsername(nativeEvent.text)}
                            style={styles.textInput}
                            placeholderTextColor="#c6c6c6"
                        />

                        <PasswordOutlinedInputWithIcon
                            icon={<MaterialIcons name="lock-outline" color={colors.primary} size={24} />}
                            contProps={styles.textInput}
                            value={password} 
                            onChangeText={({nativeEvent}) => setPassword(nativeEvent.text)}
                            style={styles.textInput}
                            placeholderTextColor="#c6c6c6"
                        />
                        
                        <Solidbutton
                            text="Login"
                            style={styles.button}
                            onPress={onPress}
                        />
                        <View style={styles.forgotCont}>
                            <Text style={[styles.forgot, {color: colors.text}]} onPress={_ => navigate('Reset')}>Forgot password?</Text>
                            <Text style={[styles.forgot, {color: colors.text}]} onPress={_ => biometric()}>Fingerprint Login</Text>
                        </View>
                    
                    </KeyboardAvoidingView>
                    <View style={styles.bottom}>
                        <Text style={[styles.link, {color: colors.text}]}>
                            Don't have an account? 
                            <Text style={[styles.inner, {color: colors.text}]} onPress={() => navigate('Register')}> Register</Text>
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
    view: {
        flex: 1,
        width: '100%',
        justifyContent: "space-between",
    },
    image: {
        width: wp("60%"),
        height: hp("20%"),
        resizeMode: 'contain',
    },
    header: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: hp('7%'),
    },
    link: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: wp("3%"),
    },
    inner: {
        fontFamily: 'OpenSans_700Bold',
        textDecorationLine: 'underline',
    },
    button: {
        width: '100%',
        marginVertical: hp('1.5%'),
    },
    textInput: {
        marginVertical: hp("1.5%"),
    },
    bottom: {
        justifyContent: 'center',
        alignItems: "center",
        height: hp("10%"),
    },
    forgotCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    forgot: {
        fontFamily: 'Montserrat_400Regular',
        marginVertical: hp('1.5%'),
        fontSize: wp("3%")
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