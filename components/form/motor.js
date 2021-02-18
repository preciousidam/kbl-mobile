import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { OutlinedInput } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';
import { carApi } from '../../apiAuth/carApi';
import {edit} from '../../store/reducers/policy';
import { ImageUploader } from '../imageUploader';
import { ScrollView } from 'react-native';


export const MotorForm = ({}) => {
    
    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    const {colors, dark} = useTheme();
    const [carMakes, setCarMakes] = useState([]);
    const [carModels, setCarModels] = useState([]);
    
    const {form} = useSelector(state => state.policies);
    const [allCars, setCars] = useState([]);
    const dispatch = useDispatch();
    

    const cars = async _ => {
        const {data} = await carApi.get('vehicles/models/');
        
        setCars(data);
        let make = data.map(veh => `${veh.make}`).sort();
        let set = new Set(make)
        setCarMakes(['Select Vehicle Make',...set]);
    }

    useEffect(() => {
        const filtered = allCars.filter(({make}) => make == form?.vehicle_make);
        let models = filtered.map(veh => `${veh.model}`).sort();
        let hold = new Set(models)
        setCarModels(['Select Vehicle Model',...hold]);
        
    }, [form?.vehicle_make])


    useEffect(() => {
        cars();
    },[])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: hp("2%")}
            style={styles.form}
        >
            <ScrollView>
                <Picker
                    
                    options={carMakes} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={form.vehicle_make||'Select Vehicle Make'}
                    onValueChange={(item,i) => dispatch(edit({...form, vehicle_make: item}))}
                />
                <Picker
                    
                    options={carModels} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={form.vehicle_model||'Select Vehicle Model'}
                    onValueChange={(item,i) => dispatch(edit({...form, vehicle_model: item}))}
                />
                <OutlinedInput 
                    placeholder="Vehicle Year"
                    style={styles.input}
                    value={form.vehicle_year}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, vehicle_year: nativeEvent.text}))}
                    keyboardType="numeric"
                />
                <OutlinedInput 
                    placeholder="Vehicle Color"
                    style={styles.input}
                    value={form.vehicle_color}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, vehicle_color: nativeEvent.text}))}
                />
                <Picker
                    options={['Select Duration', 'Half Yearly', 'Quarterly', 'Yearly']} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={form.duration||'Select Duration'}
                    onValueChange={(item,i) => dispatch(edit({...form, duration: item}))}
                />
                <Picker
                    prompt="Vehicle Class"
                    options={['Buses, Omnibus','Commercial', 
                                'Company, Taxi, Car Hire',
                                'Motorcycle/Tricycle',
                                'Private Vehicle / Car',
                                'Stage Carriage 8 - 15 persons',
                                'Stage Carriage over 15 persons',
                                'Tractor & Equipment', 
                            ]} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={form.vehicle_class||'Vehicle Class'}
                    onValueChange={(item,i) => dispatch(edit({...form, vehicle_class: item}))}
                />
                <OutlinedInput 
                    placeholder="Vehicle Reg No."
                    style={styles.input}
                    value={form.registration_number}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, registration_number: nativeEvent.text.replace(/\s+/g, '').replace('-','')}))}
                />
                <OutlinedInput 
                    placeholder="Engine No."
                    style={styles.input}
                    value={form.engine_number}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, engine_number: nativeEvent.text}))}
                />
                <OutlinedInput 
                    placeholder="Chasis No."
                    style={styles.input}
                    value={form.chasis_number}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, chasis_number: nativeEvent.text.replace("I", '').replace('O','').replace("i", '').replace('o','')}))}
                />
                <OutlinedInput 
                    placeholder="Vehicle value"
                    style={styles.input}
                    value={form.value}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
                    keyboardType="numeric"
                />
                <ImageUploader image={form.front_image} callback={image => dispatch(edit({...form, front_image: image}))} text="Upload front image of Vehicle" />
                <ImageUploader image={form.back_image} callback={image => dispatch(edit({...form, back_image: image}))}  text="Upload back image of Vehicle" />
                <ImageUploader image={form.vehicle_license} callback={image => dispatch(edit({...form, vehicle_license: image}))} text="Upload vehicle license"  />
                <ImageUploader image={form.proof_of_ownership} callback={image => dispatch(edit({...form, proof_of_ownership: image}))} text="Upload Proof of ownership"  />
            </ScrollView>
        </KeyboardAvoidingView>
        
   );
}



const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: wp("2%"),
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 10,
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 150,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
    }
})