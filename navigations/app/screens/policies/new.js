import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DynamicPickerInline, DynamicPickerInlineIOS} from '../../../../components/input/picker';
import { useDispatch, useSelector } from 'react-redux';
import {edit, savePolicyAsync} from '../../../../store/reducers/policy'

import { FormHeader } from '../../../../components/header';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { MotorForm } from '../../../../components/form/motor';
import {HomeForm } from '../../../../components/form/home';
import { ActInd } from '../../../../components/activityIndicator';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { Outlinedbutton } from '../../../../components/button';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



   
const Picker = Platform.OS === 'ios' ? DynamicPickerInlineIOS: DynamicPickerInline;

export const NewPolicy = ({ navigation,route}) => {

    
    const {products} = useSelector(state => state.app)
    const {kyc} = useSelector(state => state.kyc);
    const {pid} = route?.params;
    const options = products.map(({name}) => name);
    const {colors, dark} = useTheme();
    
    const [selected, setSelected] = useState(pid||products[0]?.id);
    const [category, setCategory] = useState(null);
    const [pName, setPName] = useState('');
    const [productInfo, setProductInfo] = useState('');
    const dispatch = useDispatch();
    
    

    useEffect(() => {
        const {category, description, name} = products.find(({id}) => id === selected)
        setCategory(category);
        setProductInfo(description);
        setPName(name);
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

        if(!kyc?.email && !kyc?.name && !kyc?.phone){
            showMessage({
                type: 'warning',
                message: 'KYC Update',
                icon: 'auto',
                hideStatusBar: true,
                autoHide: false,
                renderCustomContent: () => <ActionMessage
                    message="Please note you have to fill your KYC before you can proceed."
                    positive={() => {
                        navigation.navigate('KYC', {screen: 'updateKYC'});
                        hideMessage();
                    }}
                    negative={() => hideMessage()}
                />
            });

            return;
        }
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
                    {category === 'Motor' && <MotorForm productInfo={productInfo} pName={pName} />}
                    {category === 'Home' && <HomeForm productInfo={productInfo} />}
                </View>
            
            <ActInd status={processing} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

export default NewPolicy;

export const ActionMessage = ({message, positive, negative}) => {
    
    return (
        <View style={styles.message}>
            <Text style={[styles.messageText, {color: '#fff'}]}>{message}</Text>
            <View style={styles.actions}>
                <View style={{width: wp('40%')}}>
                    <Outlinedbutton text="Dismiss" onPress={negative} style={styles.btn} />
                </View>
                <View style={{width: wp('40%')}}>
                    <Outlinedbutton text="Update" onPress={positive} style={styles.btn} />
                </View>
            </View>
        </View>
    )
}

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
    },
    message: {

    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp(2)
    },
    messageText: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: wp('3.2%'),
    },
    btn: {
        borderColor: '#fff',
        borderRadius: wp(2),
        paddingVertical: hp(1.3)
    }
});