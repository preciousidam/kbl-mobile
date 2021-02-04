import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { OutlinedInput } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';
import { carApi } from '../../apiAuth/carApi';
import {edit} from '../../store/reducers/policy';
import { OutlinedDatePicker, OutlinedTimePicker } from '../input/datepicker';


export const MotorForm = ({policy}) => {
    
    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    const {colors, dark} = useTheme();
    const [carMakes, setCarMakes] = useState([]);
    const {form} = useSelector(state => state.policies);
    const dispatch = useDispatch();
    
    const [injureds, setContents] = useState([{name: '', address: '', injury: '', is_pass: false, in_hos: false, hospital: false,}])

    const addMore = _ => {
        const lastItem = contents[contents.length -1];
        if(lastItem.item != '' && lastItem.value != '')
            setContents(prev => [...prev, {item: '', value: ''}])
        return
    }

    const onTextChange = (index, value, field) => {
        console.log(value)
        const edit = contents[index];
        edit[field] = value;
        let newItems = [];
        contents.forEach((x,i) => {
            if(i == index) newItems.push(edit);
            else newItems.push(x);
        });
        setContents(newItems);
    }

    return (<View style={styles.form}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
        >
            <Picker
                prompt="Select Policy"
                options={[policy]} 
                style={{padding: 0, marginVertical: 10,}}
                value={policy}
                onValueChange={(item,i) => dispatch(edit({...form, vehicle_model: item}))}
            />
            <Text style={styles.help}>Date of Accident</Text>
            <OutlinedDatePicker
                placeholder="YYYY-MM-DD"
                style={styles.input}
                value={new Date()}
                onChangeText={value => console.log(value)}
            />
            <Text style={styles.help}>Time of Accident</Text>
            <OutlinedTimePicker
                placeholder="YYYY-MM-DD"
                style={styles.input}
                value={new Date()}
                onChangeText={value => console.log(value)}
            />
            <OutlinedInput 
                placeholder="Place of Accident"
                style={styles.input}
                value={form.registration_number}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, registration_number: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="How did the loss occure?"
                style={styles.input}
                value={form.engine_number}
                numberOfLines={10}
                multiline={true}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, engine_number: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Extent of direct damage"
                style={styles.input}
                value={form.chasis_number}
                numberOfLines={10}
                multiline={true}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, chasis_number: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Estimated cost of repair"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Policy Report if any?"
                style={styles.input}
                value={form.value}
                numberOfLines={10}
                multiline={true}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />

            <OutlinedInput 
                placeholder="Detail of other insurance cover on the car"
                style={styles.input}
                value={form.value}
                numberOfLines={10}
                multiline={true}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <Text style={styles.help}>Driver Details</Text>
            <OutlinedInput 
                placeholder="Who was driving?"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="The driver's Phone number"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Driver's Licence number"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <Text style={styles.help}>Date Issued</Text>
            <OutlinedDatePicker
                placeholder="YYYY-MM-DD"
                style={styles.input}
                value={new Date()}
                onChangeText={value => console.log(value)}
            />
            <Text style={styles.help}>Date of Expiry</Text>
            <OutlinedDatePicker
                placeholder="YYYY-MM-DD"
                style={styles.input}
                value={new Date()}
                onChangeText={value => console.log(value)}
            />
            <OutlinedInput 
                placeholder="Were you present in vehicle?"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Where can we inspect the vehicle?"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Was the accident caused by third party?"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <Text style={styles.help}>If caused by third party (or skip).</Text>
            <OutlinedInput 
                placeholder="Third party Name"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Third party Phone"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Third party address"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <Text style={styles.help}>Others.</Text>
            <OutlinedInput 
                placeholder="Damaged Property/livestock"
                style={styles.input}
                value={form.value}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
            />
            <Text style={styles.help}>Injureds</Text>
            {injureds.map(({name, value},index) => (
                <Injured 
                    key={name+index} 
                    index={index} 
                    item={name} 
                    value={value} 
                    onItemChange={onTextChange}
                />
            ))}
            <TouchableOpacity onPress={addMore}>
                <View>
                    <Text style={styles.add}><Ionicons name="ios-add-circle" color={colors.info} size={20} />  Add more</Text>
                </View>
            </TouchableOpacity>
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

export const Injured = ({index, onItemChange}) => {
    const [item, setItem] = useState('');
    const [value, setValue] = useState('');
    const onItemBlur = _ => onItemChange(index, item, 'item'); 
    const onValueBlur = _ => onItemChange(index, value, 'value'); 

    return (<View>
        <Text style={{fontFamily: "OpenSans_400Regular", fontSize:11}}>Injured #{index+1}</Text>
        <OutlinedInput
            placeholder="Name"
            style={styles.input}
            value={item}
            onChangeText={({nativeEvent}) => setItem(nativeEvent.text)}
            onBlur={onItemBlur}
        />
        <OutlinedInput
            placeholder="Phone"
            style={styles.input}
            value={value}
            onChangeText={({nativeEvent}) => setValue(nativeEvent.text)}
            onBlur={onValueBlur}
        />
        <OutlinedInput
            placeholder="address"
            style={styles.input}
            value={item}
            onChangeText={({nativeEvent}) => setItem(nativeEvent.text)}
            onBlur={onItemBlur}
        />
        <OutlinedInput
            placeholder="Is a passenger?"
            style={styles.input}
            value={value}
            onChangeText={({nativeEvent}) => setValue(nativeEvent.text)}
            onBlur={onValueBlur}
        />
        <OutlinedInput
            placeholder="Is in hospital?"
            style={styles.input}
            value={value}
            onChangeText={({nativeEvent}) => setValue(nativeEvent.text)}
            onBlur={onValueBlur}
        />
        <OutlinedInput
            placeholder="Hospital details?"
            style={styles.input}
            value={value}
            onChangeText={({nativeEvent}) => setValue(nativeEvent.text)}
            onBlur={onValueBlur}
        />
    </View>)
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
    },
    help: {
        fontSize: 12,
        fontFamily: 'OpenSans_400Regular'
    }
})