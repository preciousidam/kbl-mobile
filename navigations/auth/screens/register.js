import { useTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Text, ScrollView, Modal, ActivityIndicator } from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Solidbutton } from '../../../components/button';
import { EmailOutlinedInputWithIcon, OutlinedInput, OutlinedInputWithIcon, PasswordOutlinedInputWithIcon } from '../../../components/input';
import { useDispatch, useSelector } from 'react-redux';

import FocusAwareStatusBar from '../../../components/statusBar';
import { signUp } from '../../../store/reducers/auth';
import { isValidEmail, isValidPassword } from '../../../utility';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';



export const Register = ({navigation}) => {
    
    const {top, bottom, right, left} = useSafeAreaInsets();
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [fullname, setFullname] = useState('');
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.auth);
    

    const onPress = async _ => {
        console.log('clicked')
        if (!isValidEmail(email)){
            showMessage({
                message: 'Invalid',
                description: "Invalid Email",
                duration: 3000,
                hideStatusBar: false,
                type: 'warning',
                icon: 'warning',
            })
            return
        }

        if (!isValidPassword(password)){
            showMessage({
                message: 'Invalid',
                description: "Password must contain atleast one digit and special character",
                duration: 3000,
                hideStatusBar: false,
                type: 'warning',
                icon: 'warning',
            })
            return
        }
        const token = await AsyncStorage.getItem('pushToken');
        if (token)
            dispatch(signUp({
                username: email,
                email: email.toLowerCase(),
                password, 
                phone, 
                last_name: fullname.split(' ')[0],
                first_name: fullname.split(' ')[1],
                token,
            }));
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
                            <Text style={[styles.headerText, {color: colors['primary-dark']}]}>Create Account</Text>
                        </View>

                        <OutlinedInputWithIcon 
                            icon={<MaterialIcons name="person-outline" color={colors.primary} size={24} />}
                            placeholder="Full name"
                            contProps={styles.textInput}
                            value={fullname} 
                            onChangeText={({nativeEvent}) =>setFullname(nativeEvent.text)} 
                            style={styles.textInput}
                            textContentType="name"
                        />

                        <EmailOutlinedInputWithIcon
                            icon={<MaterialIcons name="mail-outline" color={colors.primary} size={24} />}
                            contProps={styles.textInput}
                            value={email} 
                            onChangeText={({nativeEvent}) => setEmail(nativeEvent.text)}
                            style={styles.textInput}
                        />

                        <OutlinedInputWithIcon 
                            icon={<MaterialIcons name="phone" color={colors.primary} size={24} />}
                            placeholder="Phone" 
                            value={phone} 
                            onChangeText={({nativeEvent}) => setPhone(nativeEvent.text)}
                            style={styles.textInput}
                            keyboardType='phone-pad'
                            textContentType='telephoneNumber'
                            contProps={styles.textInput}
                        />

                        <PasswordOutlinedInputWithIcon 
                            icon={<MaterialIcons name="lock-outline" color={colors.primary} size={24} />}
                            contProps={styles.textInput}
                            value={password} 
                            onChangeText={({nativeEvent}) => setPassword(nativeEvent.text)}
                            style={styles.textInput}
                        />
                        
                        <Solidbutton
                            text="Register"
                            style={styles.button}
                            onPress={onPress}
                        />
                    
                    </KeyboardAvoidingView>
                    <View style={styles.bottom}>
                        <Text style={styles.link}>
                           Already have an account? 
                            <Text style={styles.inner} onPress={() => navigate('Login')}> Login</Text>
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

export default Register;

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
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50,
    },
    headerText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 24,
        marginTop: 10,
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
    texticon: {
        fontFamily: 'Montserrat_400Regular'
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