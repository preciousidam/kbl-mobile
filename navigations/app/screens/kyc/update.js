import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { KYCIndividualForm } from '../../../../components/form/kyc';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { Solidbutton } from '../../../../components/button';


export const UpdateKYC = ({}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={[styles.container, {backgroundColor: colors.card}]}>
            <ScrollView>
                <KYCIndividualForm />
                <View style={{paddingHorizontal: 15}}>
                    <Text style={styles.help}>I hereby declare that the information I provided is true and complete to the best of my knowledge and belief and I undertake to inform KBL Insurance of any changes therein immediately. In the event that the information I provided proves to be untrue and incomplete in any respect, the Company shall have no liability under the Insurance.</Text>
                    <Solidbutton text="Submit" style={styles.button} />
                </View>
            </ScrollView>
            <FocusAwareStatusBar barStyle='light-content' backgroundColor={colors.primary} />
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