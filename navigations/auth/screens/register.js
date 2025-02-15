import { useTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Text, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Solidbutton } from '../../../components/button';
import { EmailOutlinedInputWithIcon, OutlinedInputWithIcon, PasswordOutlinedInputWithIcon } from '../../../components/input';
import { useDispatch, useSelector } from 'react-redux';

import FocusAwareStatusBar from '../../../components/statusBar';
import { signUp } from '../../../store/reducers/auth';
import { isValidEmail, isValidPassword } from '../../../utility';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



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
                        keyboardVerticalOffset={Platform.OS === 'ios' ? hp(100): hp(10)}
                    >
                        <View style={styles.header}>
                            <Image source={require('../../../assets/logo.png')} style={styles.image} />
                        </View>

                        <OutlinedInputWithIcon 
                            icon={<MaterialIcons name="person-outline" color={colors.primary} size={24} />}
                            placeholder="Full name"
                            contProps={styles.textInput}
                            value={fullname} 
                            onChangeText={({nativeEvent}) =>setFullname(nativeEvent.text)} 
                            style={styles.textInput}
                            textContentType="name"
                            placeholderTextColor="#c6c6c6"
                        />

                        <EmailOutlinedInputWithIcon
                            icon={<MaterialIcons name="mail-outline" color={colors.primary} size={24} />}
                            contProps={styles.textInput}
                            value={email} 
                            onChangeText={({nativeEvent}) => setEmail(nativeEvent.text)}
                            style={styles.textInput}
                            placeholderTextColor="#c6c6c6"
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
                            placeholderTextColor="#c6c6c6"
                        />

                        <PasswordOutlinedInputWithIcon 
                            icon={<MaterialIcons name="lock-outline" color={colors.primary} size={24} />}
                            contProps={styles.textInput}
                            value={password} 
                            onChangeText={({nativeEvent}) => setPassword(nativeEvent.text)}
                            style={{...styles.textInput, color: colors.text}}
                            placeholderTextColor="#c6c6c6"
                        />
                        
                        <Solidbutton
                            text="Register"
                            style={styles.button}
                            onPress={onPress}
                        />
                    
                    </KeyboardAvoidingView>
                    <View style={styles.bottom}>
                        <Text style={[styles.link, {color: colors.text}]}>
                           Already have an account? 
                            <Text style={[styles.inner, {color: colors.text}]} onPress={() => navigate('Login')}> Login</Text>
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
        paddingVertical: hp('5%'),
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
    texticon: {
        fontFamily: 'Montserrat_400Regular'
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    indicator: {
        width: wp(65),
        height: hp(65),
        padding: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: wp(32),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: 'rgba(0,0,0,.3)'
    },
})