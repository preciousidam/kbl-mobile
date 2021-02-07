import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormHeader } from '../../../../components/header';
import FocusAwareStatusBar from '../../../../components/statusBar';
import {edit, next, saveClaimAsync} from '../../../../store/reducers/claims';
import { Page1, Page2, Page3, Page4, Witness } from '../../../../components/form/motorClaim';
import { ScrollView } from 'react-native';
import { Alert } from 'react-native';
import {ActInd } from '../../../../components/activityIndicator';

const forms = [Page1, Page2, Page3, Page4, Witness]

export const MotorClaim = ({navigation, route}) => {
    const {colors, dark} = useTheme();
    const dispatch = useDispatch();
    const {pn} = route?.params;
    const {user} = useSelector(state => state.auth);
    const policy = useSelector(state => state.policies.policies.find(({policy_number}) => pn === policy_number));
    const {formPage: {total, page}, form, processing} = useSelector(state => state.claims);
    const [Form, setForm] = useState(() => forms[page]);

    const onNextClick = async _ => {
        if(page < total){
            dispatch(next(page+1));
        }
        else{
            Alert.alert(
                "Declaration",
                "I do hereby declare that the information given above is true and correct to the best of my knowledge. I further declare that the property for which this claim is made belongs to me, and no other person has interest in it, whether as owner, mortgagee or trustee.",
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "I Agree", onPress: () => agree() }
                ],
            );
        }
    }

    const agree = async _ => {
        dispatch(saveClaimAsync('claims/motor/', {...form, user: user?.pk}));
    }

    useEffect(() => {
        setForm(() => forms[page]);
    }, [page]);

    useEffect(() => {
        console.log(form)
        dispatch(edit({...form, policy: policy?.policy_number}))
    },[])


    const onBackClick = async _ => {
        if(page > 0){
            dispatch(next(page-1));
        }
        else navigation.goBack();
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.card}]}>
            <FormHeader 
                name="New Application" 
                Icon={() => <Ionicons name="ios-arrow-forward" size={24} color="#fff" />}
                onPress={onNextClick}
                onBackPress={onBackClick}
            />
            <ScrollView>
                <Form policy={policy} />
            </ScrollView>
            <ActInd status={processing} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})