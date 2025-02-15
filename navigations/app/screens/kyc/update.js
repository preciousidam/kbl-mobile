import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';


import { KYCIndividualForm } from '../../../../components/form/kyc';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { Solidbutton } from '../../../../components/button';
import { fetchKYCAsync, saveKYCAsync } from '../../../../store/reducers/kyc';
import { ActInd } from '../../../../components/activityIndicator';


export const UpdateKYC = ({navigation}) => {
    const {colors, dark} = useTheme();
    const dispatch = useDispatch();
    const {kyc, processing, error} = useSelector(state => state.kyc);
    const {user} = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(fetchKYCAsync(user?.email));
    },[]);

    const callback = _ => navigation.navigate('Home', {screen: 'TabNav', params: {screen: 'Home'}});

    const submit = async _ => {
     
        dispatch(saveKYCAsync({...kyc, email: user?.email, name: `${user?.first_name} ${user?.last_name}`}, callback));
        
    }   

    return (
        <View style={[styles.container, {backgroundColor: dark? colors.background:colors.card}]}>
            <ScrollView>
                <KYCIndividualForm />
                <View style={{paddingHorizontal: 15}}>
                    <Text style={[styles.help, {color: colors.text}]}>I hereby declare that the information I provided is true and complete to the best of my knowledge and belief and I undertake to inform KBL Insurance of any changes therein immediately. In the event that the information I provided proves to be untrue and incomplete in any respect, the Company shall have no liability under the Insurance.</Text>
                    <Solidbutton text="Submit" style={styles.button} onPress={submit} />
                </View>
            </ScrollView>
            <FocusAwareStatusBar barStyle='light-content' backgroundColor={colors.primary} />
            <ActInd status={processing} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    help: {
        fontSize: 12,
        fontFamily: 'OpenSans_400Regular',
    },
    button: {
        marginVertical: 15,
    }
});