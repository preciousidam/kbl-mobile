import { useFocusEffect, useTheme } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import {Text, StyleSheet, View, ScrollView, Platform, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DynamicPickerInline, DynamicPickerInlineIOS} from '../../../../components/input/picker';
import { useDispatch, useSelector } from 'react-redux';
import {edit, savePolicyAsync, reset} from '../../../../store/reducers/policy'

import { FormHeader } from '../../../../components/header';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { MotorForm } from '../../../../components/form/motor';
import {HomeForm } from '../../../../components/form/home';
import { ActInd } from '../../../../components/activityIndicator';


const forms = {Motor: <MotorForm />, Home: <HomeForm />,}
   
const Picker = Platform.OS === 'ios' ? DynamicPickerInlineIOS: DynamicPickerInline;

export const NewPolicy = ({ navigation,route}) => {

    
    const {products} = useSelector(state => state.app)
    const {pid} = route?.params;
    const options = products.map(({name}) => name);
    const {colors, dark} = useTheme();
    
    const [selected, setSelected] = useState(pid||products[0]?.id);
    const [Form, setForm] = useState();
    const dispatch = useDispatch();
    

    useEffect(() => {
        const category = products.find(({id}) => id === selected)?.category
        setForm(forms[category]);
    }, [selected]);

    

    const totalValue = _ => {
        let val = 0;
        for (let item in form.items){
            val += parseFloat(form?.items[item]?.value)
        }
        return val;
    }


    const {form, processing} = useSelector(state => state.policies);
    const {user}  = useSelector(state => state.auth);
    

    const onNextClick = async _ => {
        const product = products.find(({id}) => id === selected)
        const value = product?.category == 'Home' ? totalValue() : form.value;
        dispatch(savePolicyAsync(product,{...form, user: user.pk, product: product?.id, value}, navigation));
    }

    const onSelect = (item,i) => {
        const value = products.find(({name}) => name === item);
        dispatch(edit({...form, product: value.id}))
        setSelected(value.id);
    }


    return (
        <View style={{flex: 1, backgroundColor: dark ? colors.background:colors.card}}>
            <FormHeader 
                name="New Application" 
                Icon={() => <Ionicons name="ios-arrow-forward" size={24} color="#fff" />}
                onPress={onNextClick}
            />
            <ScrollView>
                <View style={[styles.opt, {backgroundColor: colors.card}]}>
                    <Text style={{fontFamily: 'OpenSans_700Bold', color: colors.text}}>Product</Text>
                    <Picker 
                        prompt="Select Product"
                        options={options} 
                        style={{padding: 0, width: '50%', color: colors.text}}
                        value={products.find(({id}) => selected === id)?.name}
                        onValueChange={onSelect}
                        dropdownIconColor={colors.text}
                    />
                </View>
                <View style={styles.form}>
                    {Form}
                </View>
            </ScrollView>
            <ActInd status={processing} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

export default NewPolicy;

const styles = StyleSheet.create({
    form: {
        flex: 1,
    },
    opt: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        elevation: 2,
    }
});