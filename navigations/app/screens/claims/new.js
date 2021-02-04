import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, View, ScrollView, Platform, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DynamicPickerInline, DynamicPickerInlineIOS} from '../../../../components/input/picker';

import { FormHeader } from '../../../../components/header';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { MotorForm } from '../../../../components/form/motorClaim';

import { useDispatch, useSelector } from 'react-redux';
import { retrievePolicyAsync } from '../../../../store/reducers/policy';
import { Form } from '../../../../components/form/fireClaim';

const products = [
    {name: 'Motor third party', Form: () => <MotorForm />,},
    {name: 'Home Xtra Tenant’s Plan', Form: () => <Form />,},
]


export const NewClaim = ({ navigation,route}) => {
    const {id} = route?.params;
    const [policy, setPolicy] = useState(null);
    const [active, setActive] = useState([]);
    
    const {colors, dark} = useTheme();
    const Picker = Platform.OS === 'ios' ? DynamicPickerInlineIOS: DynamicPickerInline;
    const {user} = useSelector(state => state.auth);
    const {policies} = useSelector(state => state.policies);
    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(retrievePolicyAsync(user?.pk));
    },[]);

    useEffect(() => {
        setActive(policies.filter(x => x.is_active == true));
    }, [policies])

    const onRequestClose = _ => navigation.goBack();


    return (
        <View style={{flex: 1, backgroundColor: colors.card}}>
            <FormHeader 
                name="New Application" 
                Icon={() => <Ionicons name="ios-arrow-forward" size={24} color="#fff" />}
                onPress={_ => navigation.navigate('confirmKYC')}
            />
            <ScrollView>
                <View style={styles.form}>
                    <MotorForm policy={policy} />
                </View>
            </ScrollView>
            <Modal
                visible={policy === null}
                transparent={false}
                onRequestClose={onRequestClose}
                presentationStyle="overFullScreen"
            >
                <View>
                    <View style={styles.opt}>
                        <Text style={styles.mHeader}>Select Policy</Text>
                    </View>
                    {active?<ScrollView>
                    {policies.filter(x => x.is_active == true).map(policy => 
                        <Text key={policy?.policy_number} style={styles.tButton} onPress={_ => setPolicy(policy?.policy_number)}>
                            {policy?.policy_number}
                        </Text>
                    )}
                    </ScrollView>: <Text>You dont have an active policy</Text>}
                </View>
            </Modal>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

export default NewClaim;

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
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
    },
    tButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: 'OpenSans_700Bold',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.3)'
    }
});