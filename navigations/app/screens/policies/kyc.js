import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { KYCIndividualForm } from '../../../../components/form/kyc';
import { FormHeader } from '../../../../components/header';
import FocusAwareStatusBar from '../../../../components/statusBar';


export const KYCForm = ({}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.card}]}>
            <FormHeader 
                name="Confirm KYC" 
                Icon={() => <Ionicons name="ios-arrow-forward" size={24} color="#fff" />}
                onPress={_ => navigation.navigate('confirmKYC')}
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