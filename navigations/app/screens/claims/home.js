import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormHeader } from '../../../../components/header';
import FocusAwareStatusBar from '../../../../components/statusBar';


export const FireClaim = ({navigation, route}) => {
    const {colors, dark} = useTheme();
    const dispatch = useDispatch();
    const {pn} = route?.params;
    const policy = useSelector(state => state.policies.policies.find(({policy_number}) => pn === policy_number));
    const onNextClick = async _ => {
        const product = products.find(({id}) => id === selected)
        dispatch(savePolicyAsync(product,{...form, user: user.pk, product: product?.id}, navigation));
    }

    return (
        <View style={styles.container}>
            <FormHeader 
                name="New Application" 
                Icon={() => <Ionicons name="ios-arrow-forward" size={24} color="#fff" />}
                onPress={onNextClick}
            />
            <Text>Fire Claim</Text>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})