import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {Text, StyleSheet, View, ScrollView, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DynamicPickerInline, DynamicPickerInlineIOS} from '../../../../components/input/picker';

import { FormHeader } from '../../../../components/header';
import FocusAwareStatusBar from '../../../../components/statusBar';
import { MotorForm } from '../../../../components/form/motor';
import {HomeForm } from '../../../../components/form/home';
import { PassengerForm } from '../../../../components/form/passenger';
import { MarineForm } from '../../../../components/form/marine';

const products = [
    {name: 'Motor third party', Form: () => <MotorForm />,}, 
    {name: 'Motor comprehensive', Form: () => <MotorForm />,}, 
    {name: 'Home Xtra Tenant’s Plan', Form: () => <HomeForm />,},
    {name: 'Passenger Accident Manifest', Form: () => <PassengerForm />,},
    {name: 'Marine Cargo', Form: () => <MarineForm />,},
    {name: 'GPA', Form: () => <MarineForm />,},
    {name: 'Occupiers Liability', Form: () => <MarineForm />,}
]


export const NewPolicy = ({ navigation,route}) => {
    const {id} = route?.params;
    const options = products.map(({name}) => name)
    const {colors, dark} = useTheme();
    const Picker = Platform.OS === 'ios' ? DynamicPickerInlineIOS: DynamicPickerInline;
    const [selectedProduct, setSelectedProduct] = useState(id||0);
    const [Form, setForm] = useState(() => products[selectedProduct].Form)
    useEffect(() => {
        setForm(() => products[selectedProduct].Form);
    }, [selectedProduct]);


    return (
        <View style={{flex: 1, backgroundColor: colors.card}}>
            <FormHeader 
                name="New Application" 
                Icon={() => <Ionicons name="ios-arrow-forward" size={24} color="#fff" />}
                onPress={_ => navigation.navigate('confirmKYC')}
            />
            <ScrollView>
                <View style={[styles.opt, {backgroundColor: colors.card}]}>
                    <Text style={{fontFamily: 'OpenSans_700Bold'}}>Product</Text>
                    <Picker 
                        prompt="Select Product"
                        options={options} 
                        style={{padding: 0, width: '50%'}}
                        value={options[selectedProduct]}
                        onValueChange={(item,i) => setSelectedProduct(i)}
                    />
                </View>
                <View style={styles.form}>
                    <Form />
                </View>
            </ScrollView>
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