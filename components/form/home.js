import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import { OutlinedInput } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';
import { useDispatch, useSelector } from 'react-redux';
import { edit } from '../../store/reducers/policy';
import { showMessage } from 'react-native-flash-message';


const buildingType = ['Flat', 'Detached Bungalow', 'Detached Duplex', 
    'Terrace Bungalow', 'Detached Duplex', 'Semi-detached Duplex']

export const HomeForm = ({}) => {

    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    const {colors, dark} = useTheme();

    const {form} = useSelector(state => state.policies);
    const dispatch = useDispatch();

    const addMore = _ => {
        if ('items' in form){
            let length = Object.entries(form.items).length
            
            dispatch(edit({...form, items: {...form?.items, [length]: {item: '', value: ''}}}));
            return
        }
        dispatch(edit({...form, items: {...form?.items, "0": {item: '', value: ''}}}));
        return
    }


    return (<View style={styles.form}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
        >
            <Picker
                prompt="Select Plan"
                options={['Bronze', 'Silver', 'Gold']} 
                style={{padding: 0, marginVertical: 10,}}
                value={form.plan}
                onValueChange={(item,i) => dispatch(edit({...form, plan: item}))}
            />
            <Picker
                prompt="Select Building Type"
                options={buildingType} 
                style={{padding: 0, marginVertical: 10,}}
                value={form.building_type}
                onValueChange={(item,i) => dispatch(edit({...form, building_type: item}))}
            />
            <OutlinedInput 
                placeholder="Property Address"
                style={styles.input}
                value={form.address}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, address: nativeEvent.text}))}
            />
            <Text style={{fontFamily: 'Montserrat_700Bold', marginVertical: 15,}}>Contents</Text>
            {form?.items && Object.entries(form.items).map((item,index) => (
                <Items 
                    key={`item${index}`} 
                    index={index} 
                />
            ))}
        </KeyboardAvoidingView>
        
        <TouchableOpacity onPress={addMore}>
            <View>
                <Text style={styles.add}><Ionicons name="ios-add-circle" color={colors.info} size={20} />  Add more</Text>
            </View>
        </TouchableOpacity>
        
    </View>);
}

export const Items = ({index, onItemChange}) => {
    
    const {form} = useSelector(state => state.policies);
    const dispatch = useDispatch();
    

    return (<View>
        <Text style={{fontFamily: "OpenSans_400Regular"}}>Item #{index+1}</Text>
        <OutlinedInput
            placeholder="Item"
            style={styles.input}
            value={form?.items[index]?.item}
            onChangeText={({nativeEvent}) => 
                dispatch(edit({...form, 
                    items: { ...form.items, 
                        [index]: {...form.items[index], 
                            item: nativeEvent.text}
                        }
                    }
                ))
            }
        />
        <OutlinedInput
            placeholder="Item value"
            style={styles.input}
            value={form?.items[index]?.value}
            onChangeText={({nativeEvent}) => 
                dispatch(edit({...form, 
                    items: { ...form.items, 
                        [index]: {...form.items[index], 
                            value: nativeEvent.text}
                        }
                    }
                ))
            }
            keyboardType="numeric" 
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
    add: {
        textAlign: "center",
        fontFamily: 'OpenSans_400Regular',
        textAlignVertical: "center"
    }
})