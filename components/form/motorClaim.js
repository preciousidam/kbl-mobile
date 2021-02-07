import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { OutlinedInput } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';
import { carApi } from '../../apiAuth/carApi';
import {edit} from '../../store/reducers/claims';
import { OutlinedDatePicker, OutlinedTimePicker } from '../input/datepicker';
import {ImageUploader} from './motor';

const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;

export const Page1 = ({policy}) => {
    
    const {form} = useSelector(state => state.claims);
    const dispatch = useDispatch();

    return (<View style={styles.form}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
        >
            <OutlinedInput 
                placeholder="Policy Number"
                style={styles.input}
                value={form.policy}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, policy: nativeEvent.text}))}
            />
            <Text style={styles.help}>Date of Accident</Text>
            <OutlinedDatePicker
                placeholder="YYYY-MM-DD"
                style={styles.input}
                value={form?.accident_date || new Date()}
                onChangeText={value => dispatch(edit({...form, accident_date: value}))}
            />
            <Text style={styles.help}>Time of Accident</Text>
            <OutlinedTimePicker
                placeholder="YYYY-MM-DD"
                style={styles.input}
                value={form?.accident_time || new Date()}
                onChangeText={value => dispatch(edit({...form, accident_time: value}))}
            />
            <OutlinedInput 
                placeholder="Place of Accident"
                style={styles.input}
                value={form?.accident_place}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, accident_place: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="How did the loss occure?"
                style={styles.input}
                value={form?.desc}
                numberOfLines={10}
                multiline={true}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, desc: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Extent of direct damage"
                style={styles.input}
                value={form?.damage_desc}
                numberOfLines={10}
                multiline={true}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, damage_desc: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Estimated cost of repair"
                style={styles.input}
                value={form?.est_cost}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, est_cost: nativeEvent.text}))}
                keyboardType="numeric"
            />
            <OutlinedInput 
                placeholder="Police Report if any?"
                style={styles.input}
                value={form?.police_report}
                numberOfLines={10}
                multiline={true}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, police_report: nativeEvent.text}))}
            />

            <OutlinedInput 
                placeholder="Detail of other insurance cover on the car"
                style={styles.input}
                value={form?.other_policy}
                numberOfLines={10}
                multiline={true}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, other_policy: nativeEvent.text}))}
            />

        </KeyboardAvoidingView>
    </View>);
}

export const Page2 = ({}) => {
   
    const {form} = useSelector(state => state.claims);
    const dispatch = useDispatch();

    return (<View style={styles.form}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
        >
            <Text style={styles.help}>Driver Details</Text>
            <OutlinedInput 
                placeholder="Who was driving?"
                style={styles.input}
                value={form?.driver}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, driver: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="The driver's Phone number"
                style={styles.input}
                value={form?.driver_phone}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, driver_phone: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Driver's Licence number"
                style={styles.input}
                value={form?.driver_licence}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, driver_licence: nativeEvent.text}))}
            />
            <Text style={styles.help}>Date Issued</Text>
            <OutlinedDatePicker
                placeholder="YYYY-MM-DD"
                style={styles.input}
                value={form?.licence_date_issued || new Date()}
                onChangeText={value => dispatch(edit({...form, licence_date_issued: value}))}
            />
            <Text style={styles.help}>Date of Expiry</Text>
            <OutlinedDatePicker
                placeholder="YYYY-MM-DD"
                style={styles.input}
                value={form?.licence_date_expired || new Date()}
                onChangeText={value => dispatch(edit({...form, licence_date_expired: value}))}
            />
            <OutlinedInput 
                placeholder="Were you present in vehicle?"
                style={styles.input}
                value={form?.present_in_vehicle}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, present_in_vehicle: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Where can we inspect the vehicle?"
                style={styles.input}
                value={form?.current_location}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, current_location: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Was the accident caused by third party?"
                style={styles.input}
                value={form?.cause_by_tp}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, cause_by_tp: nativeEvent.text}))}
            />
            
        </KeyboardAvoidingView>
    </View>);
}

export const Page3 = ({}) => {
   
    const {form} = useSelector(state => state.claims);
    const dispatch = useDispatch();

    return (<View style={styles.form}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
        >
            <Text style={styles.help}>If caused by third party (or skip).</Text>
            <OutlinedInput 
                placeholder="Third party Name"
                style={styles.input}
                value={form?.tp_name}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, tp_name: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Third party Phone"
                style={styles.input}
                value={form?.tp_phone}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, tp_phone: nativeEvent.text}))}
            />
            <OutlinedInput 
                placeholder="Third party address"
                style={styles.input}
                value={form?.tp_address}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, tp_address: nativeEvent.text}))}
            />
            <Text style={styles.help}>Others.</Text>
            <OutlinedInput 
                placeholder="Damaged Property/livestock"
                style={styles.input}
                value={form?.damage_prop_live}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, damage_prop_live: nativeEvent.text}))}
            />
        </KeyboardAvoidingView>
        
    </View>);
}

export const Page4 = ({}) => {
   
    const {form} = useSelector(state => state.claims);
    const dispatch = useDispatch();
    const {colors} = useTheme();

    const addMore = _ => {
        console.log(form)
        if ('injureds' in form){
            let length = Object.entries(form.injureds).length
            
            dispatch(edit({...form, injureds: {...form?.injureds, [length]: {name: '', address: '', injury: '', is_passenger: ''}}}));
            return
        }
        dispatch(edit({...form, items: {...form?.items, "0": {name: '', address: '', injury: '', is_passenger: ''}}}));
        return
    }

    return (<View style={styles.form}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
        >

            <Text style={styles.help}>Injureds</Text>
            
            {form?.injureds && Object.entries(form.injureds).map((item,index) => (
                <Injured 
                    key={`injureds${index}`} 
                    index={index} 
                />
            ))}
           
            <TouchableOpacity onPress={addMore} >
                <View>
                    <Text style={styles.add}><Ionicons name="ios-add-circle" color={colors.info} size={20} />  Add more</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>);
}

export const Witness = ({}) => {
    const {form} = useSelector(state => state.claims);
    const dispatch = useDispatch();
    const {colors} = useTheme();
    return (
        <View style={styles.form}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios'? "padding": "position"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
            >
                <Text style={styles.help}>Witness</Text>
                <OutlinedInput 
                    placeholder="Witness Name"
                    style={styles.input}
                    value={form?.witness_name}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, witness_name: nativeEvent.text}))}
                />
                <OutlinedInput 
                    placeholder="Witness address"
                    style={styles.input}
                    value={form?.witness_address}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, witness_address: nativeEvent.text}))}
                />
                <OutlinedDatePicker
                    placeholder="YYYY-MM-DD"
                    style={styles.input}
                    value={form?.witness_date || new Date()}
                    onChangeText={value => dispatch(edit({...form, witness_date: value}))}
                />
                <ImageUploader image={form.witness_signature} callback={image => dispatch(edit({...form, witness_signature: image}))} text="Upload Signature"  />
            </KeyboardAvoidingView>
        </View>
    )
}
export const SignOff = ({}) => {
    const {form} = useSelector(state => state.claims);
    const dispatch = useDispatch();
    const {colors} = useTheme();
    return (
        <View style={styles.form}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios'? "padding": "position"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
            >
                <Text style={styles.help}>Witness</Text>
                <OutlinedInput 
                    placeholder="Witness Name"
                    style={styles.input}
                    value={form.value}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
                />
                <OutlinedInput 
                    placeholder="Witness address"
                    style={styles.input}
                    value={form.value}
                    onChangeText={({nativeEvent}) => dispatch(edit({...form, value: nativeEvent.text}))}
                />
                <OutlinedDatePicker
                    placeholder="YYYY-MM-DD"
                    style={styles.input}
                    value={new Date()}
                    onChangeText={value => console.log(value)}
                />
                <ImageUploader />
            </KeyboardAvoidingView>
        </View>
    )
}

export const Injured = ({index, onItemChange}) => {
    const {form} = useSelector(state => state.claims);
    const dispatch = useDispatch();

    return (<View>
        <Text style={{fontFamily: "OpenSans_400Regular", fontSize:11}}>Injured #{index+1}</Text>
        <OutlinedInput
            placeholder="Name"
            style={styles.input}
            value={form?.injureds[index]?.name}
            onChangeText={({nativeEvent}) => 
                dispatch(edit({...form, 
                    injureds: { ...form.injured, 
                        [index]: {...form.injureds[index], 
                            name: nativeEvent.text}
                        }
                    }
                ))
            }
        />
        <OutlinedInput
            placeholder="Phone"
            style={styles.input}
            value={form?.injureds[index]?.phone}
            onChangeText={({nativeEvent}) => 
                dispatch(edit({...form, 
                    injureds: { ...form.injured, 
                        [index]: {...form.injureds[index], 
                            phone: nativeEvent.text}
                        }
                    }
                ))
            }
        />
        <OutlinedInput
            placeholder="Address"
            style={styles.input}
            value={form?.injureds[index]?.address}
            onChangeText={({nativeEvent}) => 
                dispatch(edit({...form, 
                    injureds: { ...form.injured, 
                        [index]: {...form.injureds[index], 
                            address: nativeEvent.text}
                        }
                    }
                ))
            }
        />
        <OutlinedInput
            placeholder="Injuries"
            style={styles.input}
            value={form?.injureds[index]?.injury}
            onChangeText={({nativeEvent}) => 
                dispatch(edit({...form, 
                    injureds: { ...form.injured, 
                        [index]: {...form.injureds[index], 
                            injury: nativeEvent.text}
                        }
                    }
                ))
            }
        />
        <OutlinedInput
            placeholder="Is a passenger?"
            style={styles.input}
            value={form?.injureds[index]?.is_passenger}
            onChangeText={({nativeEvent}) => 
                dispatch(edit({...form, 
                    injureds: { ...form.injured, 
                        [index]: {...form.injureds[index], 
                            is_passenger: nativeEvent.text}
                        }
                    }
                ))
            }
        />
        <OutlinedInput
            placeholder="Is in hospital?"
            style={styles.input}
            value={form?.injureds[index]?.in_hospital}
            onChangeText={({nativeEvent}) => 
                dispatch(edit({...form, 
                    injureds: { ...form.injured, 
                        [index]: {...form.injureds[index], 
                            in_hospital: nativeEvent.text}
                        }
                    }
                ))
            }
        />
        <OutlinedInput
            placeholder="Hospital details?"
            style={styles.input}
            value={form?.injureds[index]?.hospital_detail}
            onChangeText={({nativeEvent}) => 
                dispatch(edit({...form, 
                    injureds: { ...form.injured, 
                        [index]: {...form.injureds[index], 
                            hospital_detail: nativeEvent.text}
                        }
                    }
                ))
            }
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