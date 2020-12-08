import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { KYCIndividualForm } from '../../../../components/form/kyc';
import FocusAwareStatusBar from '../../../../components/statusBar';


export const UpdateKYC = ({}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.card}]}>
            <ScrollView>
                <KYCIndividualForm />
            </ScrollView>
            <FocusAwareStatusBar barStyle='light-content' backgroundColor={colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});