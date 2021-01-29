import { useTheme } from '@react-navigation/native';
import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';

import { KYCIndividualForm } from '../../../../components/form/kyc';
import { FormHeader } from '../../../../components/header';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { Solidbutton } from '../../../../components/button';
import { fetchKYCAsync, saveKYCAsync } from '../../../../store/reducers/kyc';
import { ActInd } from '../../../../components/activityIndicator';


export const KYCForm = ({navigation}) => {
    const {colors, dark} = useTheme();
    const dispatch = useDispatch();
    const {kyc, processing, error} = useSelector(state => state.kyc);
    const {user} = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(fetchKYCAsync(user.email));
    },[]);

    const submit = _ => {
       
        dispatch(saveKYCAsync(kyc));
        if (error === false){
            showMessage({
                type: 'success',
                message: "KYC updated",
                description: "Your KYC has been updated successfully",
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
            navigation.navigate('summary')
        }

    }

    return (
        <View style={[styles.container, {backgroundColor: colors.card}]}>
            <FormHeader 
                name="Confirm KYC" 
                Icon={() => <Ionicons name="ios-arrow-forward" size={24} color="#fff" />}
                onPress={submit}
            />
            <ScrollView>
                <KYCIndividualForm />
            </ScrollView>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});