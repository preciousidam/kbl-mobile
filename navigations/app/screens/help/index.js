import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, TextInput, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Foundation, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import FocusAwareStatusBar from '../../../../components/statusBar';
import { OutlinedInput } from '../../../../components/input';
import getLoginClient from '../../../../apiAuth/loggedInClient';
import { showMessage } from 'react-native-flash-message';
import { logout } from '../../../../store/reducers/auth';
import { useDispatch } from 'react-redux';
import { ActInd } from '../../../../components/activityIndicator';


export const Help = ({navigation}) => {
    const {colors, dark} = useTheme();
    const [details, setDetails] = useState({});
    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();

    const onChange = (key, value) => {
        setDetails(prev => ({...prev, [key]: value}));
    }

    const send_mail = async _ => {
        const client = await getLoginClient();
        setProcessing(true);
        client.defaults.headers.post['Content-type'] = 'application/json';
        try{
            const {data, status} = await client.post(`contact-us/`, details)
            setProcessing(false);
            if (status === 200 || status === 201){
                showMessage({
                    type: 'success',
                    message: data.message,
                    duration: 3000,
                    icon: 'success',
                    hideStatusBar: true,
                })
                return;
            }

            if(status === 401){
                Alert.alert('Token Expired', 'Please login again to continue.')
                dispatch(logout());
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
        <View style={styles.container}>
            <ScrollView>
                <LinearGradient
                    colors={[colors['primary-transparent'], colors['primary-transparent-300'], colors['primary-transparent-100'],]}
                    style={[styles.top, {backgroundColor: colors['primary-transparent']}]}
                >
                    <View style={styles.shared}>
                        <View style={styles.fst}><Ionicons name="location-sharp" size={wp(6)} color="#fff" /></View>
                        <View style={styles.snd}>
                            <Text style={styles.text}>BLOCK 138 PLOT 5 GABRIEL OLUSANYA STR. BY ELF BUS-STOP LEKKI, LAGOS</Text>
                        </View>
                    </View>
                    <View style={styles.shared}>
                        <View style={styles.fst}><Ionicons name="mail" size={wp(6)} color="#fff" /></View>
                        <View style={styles.snd}>
                            <Text style={styles.text}>info@kblinsurance.com</Text>
                        </View>
                    </View>
                    <View style={styles.shared}>
                        <View style={styles.fst}><Foundation name="telephone" size={wp(6)} color="#fff" /></View>
                        <View style={styles.snd}>
                            <Text onPress={_ => Linking.openURL(`tel:07032358685`)} style={[styles.text, {marginRight: 15}]}>07032358685</Text>
                            <Text onPress={_ => Linking.openURL(`tel:08090512127`)} style={[styles.text]}>08090512127</Text>
                        </View>
                    </View>

                    <View style={styles.shared}>
                        <View style={styles.fst}><Ionicons name="md-logo-whatsapp" size={wp(6)} color="#fff" /></View>
                        <View style={styles.snd}>
                            <TouchableOpacity
                                activeOpacity={.7}
                                onPress={_ => Linking.openURL(`http://api.whatsapp.com/send?phone=2347040345052`)}
                            >
                                <Text 
                                    style={[styles.text, {marginRight: 15}]}
                                >
                                    07040345052 - Click to start a chat
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                <View style={[styles.bottom, {backgroundColor: colors.card}]}>
                    <Text style={[styles.header, {color: colors.text}]}>Leave A Message</Text>
                    <OutlinedInput 
                        style={styles.input}
                        placeholder="Fullname"
                        onChangeText={({nativeEvent}) => onChange('name',nativeEvent?.text)}
                        value={details?.name}
                    />
                    <OutlinedInput 
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={({nativeEvent}) => onChange('email',nativeEvent?.text)}
                        value={details?.email}
                    />
                    <OutlinedInput 
                        style={styles.input}
                        placeholder="Subject"
                        onChangeText={({nativeEvent}) => onChange('subject',nativeEvent?.text)}
                        value={details?.subject}
                    />
                    <TextInput 
                        style={[styles.input, styles.message]}
                        placeholder="Message"
                        multiline={true}
                        onChangeText={ text => onChange('message',text)}
                        value={details?.message}
                        placeholderTextColor="#c6c6c6"
                    />

                    <TouchableOpacity activeOpacity={.7} onPress={send_mail}>
                        <View style={styles.send} onPress={send_mail}>
                            <Text style={[styles.sendText, {color: colors.text}]} onPress={send_mail}>SEND</Text>
                            <Text
                                onPress={send_mail}
                                style={[styles.circle, {backgroundColor: colors.success}]}
                            >
                                <FontAwesome name="send" size={wp(4)} color="#fff" />
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ActInd status={processing} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content'} backgroundColor={colors.card} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        padding: hp(1.3),
    },
    shared:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2.5),
    },
    fst: {
        flex: 1,
    },
    snd: {
        flex: 4,
        flexDirection: 'row'
    },
    text: {
        fontFamily: 'OpenSans_400Regular',
        color: '#fff',
        fontSize: wp(3.3)
    },
    bottom: {
        padding: 15,
        borderBottomLeftRadius: wp(7),
        borderBottomRightRadius: wp(7),
    },
    header: {
        fontFamily: 'Montserrat_700Bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginVertical: hp(1.6),
        fontSize: wp(3.6)
    },
    input: {
        paddingHorizontal: wp(3),
        paddingVertical: hp(.3),
        borderRadius: wp(2),
        marginVertical: hp(1.2),
    },
    message: {
        height: hp(15),
        borderWidth: 1,
        borderColor: '#c6c6c6',
        textAlignVertical: 'top',
        paddingVertical: hp(1.3),
    },
    send: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        padding: 10,
        alignItems: 'center'
    },
    sendText:{
        fontFamily: 'Montserrat_700Bold',
        fontSize: wp(2.9),
        marginRight: wp(3)
    },
    circle: {
        padding: 10,
        width: 50,
        height: 50,
        borderRadius: 32,
        textAlign: 'center',
        textAlignVertical: 'center',
        elevation: 2,
    }
})