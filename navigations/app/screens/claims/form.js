import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, View, ScrollView, Platform, Modal, TextInput} from 'react-native';
import FocusAwareStatusBar from '../../../../components/statusBar';

import { useDispatch, useSelector } from 'react-redux';
import { OutlinedInput } from '../../../../components/input';
import { Solidbutton } from '../../../../components/button';
import { ActInd } from '../../../../components/activityIndicator';
import getLoginClient from '../../../../apiAuth/loggedInClient';
import { showMessage } from 'react-native-flash-message';


export const ClaimsForm = ({ navigation,route}) => {
    
    const {colors, dark} = useTheme();
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [policy, setPolicy] = useState('');
    const [details, setDetails] = useState('');
    const [processing, setProcessing] = useState(false);       

    const onPress = async _ => {

        if(policy == '' || details == ''){
            showMessage({
                type: "danger",
                message: "All fields must be filled",
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
            return
        }
        const client = await getLoginClient();
        setProcessing(true);
        client.defaults.headers.post['Content-type'] = 'application/json';
        try{
            const {data, status} = await client.post(`mail/claims/application/`, {user: user.pk, policy,details})
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
        <View style={{flex: 1, backgroundColor: colors.card, padding: 15}}>
            <Text style={styles.mHeader}>Provide your policy number and additional information to enable us assist you</Text>
            <View style={styles.form}>
                <OutlinedInput 
                    style={styles.input}
                    placeholder="Policy Number"
                    onChangeText={({nativeEvent}) => setPolicy(nativeEvent?.text)}
                    value={policy}
                />
                <TextInput 
                    style={[styles.input, styles.message]}
                    placeholder="Addition Information"
                    multiline={true}
                    onChangeText={text => setDetails(text)}
                    value={details}
                />

                <Solidbutton text="Submit" onPress={onPress} style={{marginVertical: 20,}} />
            </View>
            <ActInd status={processing} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

export default ClaimsForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
    },
    opt: {
        width: "100%",
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        backgroundColor: '#fff'
    },
    mHeader: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 15,
    },
    tButton: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontFamily: 'OpenSans_700Bold',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.3)'
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 10,
        marginVertical: 10,
    },
    message: {
        height: 150,
        borderWidth: 1,
        borderColor: '#c6c6c6',
        textAlignVertical: 'top',
        paddingVertical: 15,
    },
});