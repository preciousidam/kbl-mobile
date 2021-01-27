import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { OutlinedInput } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';
import { carApi } from '../../apiAuth/carApi';
import {edit} from '../../store/reducers/policy';


export const MotorForm = ({}) => {
    
    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    const {colors, dark} = useTheme();
    const [carMakes, setCarMakes] = useState([]);
    const {form} = useSelector(state => state.policies);
    const dispatch = useDispatch()
    

    const cars = async _ => {
        const {data:{results}} = await carApi.get('classes/Carmodels_Car_Model_List?limit=100&order=-Year');
        
        let make_model = results.map(veh => `${veh.Make} ${veh.Model}(${veh.Year})`)
        setCarMakes(make_model);
    }

    useEffect(() => {
        cars();
    },[])

    return (<View style={styles.form}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
        >
            <Picker
                prompt="Select car model"
                options={carMakes} 
                style={{padding: 0, marginVertical: 10,}}
                value={form.vehicle_model||'Vehicle Model'}
                onValueChange={(item,i) => dispatch(edit({...form, vehicle_model: item}))}
            />
            <Picker
                prompt="Vehicle Class"
                options={['Vehicle Class', 'Commercial', 'Company, Taxi, Car Hire', 
                            'Stage Carriage 8 - 15 persons',
                            'Stage Carriage over 15 persons',
                            'Buses, Omnibus', 'Motorcycle/Tricycle',
                            'Tractor & Equipment', 'Private Vehicle / Car',
                        ]} 
                style={{padding: 0, marginVertical: 10,}}
                value={form.vehicle_class||'Vehicle Class'}
                onValueChange={(item,i) => dispatch(edit({...form, vehicle_class: item}))}
            />
            <OutlinedInput 
                placeholder="Vehicle Reg No."
                style={styles.input}
                value={form.registration_number}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, registration_number: nativeEvent.text}))}
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
                onChangeText={({nativeEvent}) => dispatch(edit({...form, chasis_number: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Vehicle value"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
        </KeyboardAvoidingView>
        <ImageUploader image={form.front_image} callback={image => dispatch(edit({...form, front_image: image}))} text="Upload front image of Vehicle" />
        <ImageUploader image={form.back_image} callback={image => dispatch(edit({...form, back_image: image}))}  text="Upload back image of Vehicle" />
        <ImageUploader image={form.vehicle_license} callback={image => dispatch(edit({...form, vehicle_license: image}))} text="Upload vehicle license"  />
        <ImageUploader image={form.proof_of_ownership} callback={image => dispatch(edit({...form, proof_of_ownership: image}))} text="Upload Proof of ownership"  />
    </View>);
}

export const ImageUploader = ({image, callback, text}) => {
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
            return;
        }
        callback(pickerResult)
    }
    const {colors, dark} = useTheme();

    return (
        <TouchableOpacity onPress={openImagePickerAsync}>
            <View style={[styles.image, {borderColor: colors.primary}]} >
                {image? 
                    <Image source={{uri: image?.uri || image}} style={{width: 60, height: 60}} />
                    :<Ionicons name="ios-images" color={colors.info} size={60} />}
                <Text style={{fontFamily: 'OpenSans_400Regular'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 20,
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