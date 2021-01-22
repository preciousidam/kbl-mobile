import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {getMediaLibraryPermissionsAsync, launchImageLibraryAsync,
        requestMediaLibraryPermissionsAsync, MediaTypeOptions, requestCameraPermissionsAsync} from 'expo-image-picker';
import { useTheme } from '@react-navigation/native';

import { OutlinedInput } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';
import { carApi } from '../../apiAuth/carApi';


export const MotorForm = ({}) => {

    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    const {colors, dark} = useTheme();
    const [carMakes, setCarMakes] = useState([]);
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);

    const cars = async _ => {
        const {data:{results}} = await carApi.get('classes/Carmodels_Car_Model_List?limit=1000000');
        let make_model = results.map(veh => `${veh.Make} ${veh.Model}(${veh.Year})`)
        setCarMakes(make_model);
    }

    useEffect(() => {
        cars();
    },[])

    const pickImage = async _ => {
        let result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
    
        console.log(result);
    
    }

    return (<View style={styles.form}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
        >
            <Picker
                prompt="Select car model"
                options={carMakes} 
                style={{padding: 0, marginVertical: 10,}}
                value={null}
                onValueChange={(item,i) => console.log(item)}
            />
            <Picker
                prompt="Vehicle Class"
                options={['Commercial', 'Company, Taxi, Car Hire', 
                            'Stage Carriage 8 - 15 persons',
                            'Stage Carriage over 15 persons',
                            'Buses, Omnibus', 'Motorcycle/Tricycle',
                            'Tractor & Equipment', 'Private Vehicle / Car',
                        ]} 
                style={{padding: 0, marginVertical: 10,}}
                value={null}
                onValueChange={(item,i) => console.log(item)}
            />
            <OutlinedInput 
                placeholder="Vehicle Reg No."
                style={styles.input}
            />
            <OutlinedInput 
                placeholder="Engine No."
                style={styles.input}
            />
            <OutlinedInput 
                placeholder="Chassis No."
                style={styles.input}
            />
            <OutlinedInput 
                placeholder="Vehicle value"
                style={styles.input}
            />
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={pickImage}>
            <View style={[styles.image, {borderColor: colors.primary}]} >
                <Ionicons name="ios-images" color={colors.info} size={60} />
                <Text style={{fontFamily: 'OpenSans_400Regular'}}>Click to upload vehicle papers</Text>
            </View>
        </TouchableOpacity>
    </View>);
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