import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, KeyboardAvoidingView, TouchableOpacity, useWindowDimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HTML from "react-native-render-html";

import { OutlinedInput } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';
import { useDispatch, useSelector } from 'react-redux';
import { edit } from '../../store/reducers/policy';
import { showMessage } from 'react-native-flash-message';
import { Money } from '../money';
import { ScrollView } from 'react-native';
import { colors } from 'react-native-elements';
import { Pressable } from 'react-native';
import { Modal } from 'react-native';


const buildingType = ['Flat', 'Detached Bungalow', 'Detached Duplex', 
    'Terrace Bungalow', 'Detached Duplex', 'Semi-detached Duplex']

export const HomeForm = ({productInfo}) => {

    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    const {colors, dark} = useTheme();
    const plan = {Gold: 1000000, Silver: 750000, Bronze: 500000}

    const {form} = useSelector(state => state.policies);
    const dispatch = useDispatch();
    const [exceeded, setExceeded] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const totalValue = _ => {
        let val = 0;
        for (let item in form.items){
            val += parseFloat(form?.items[item]?.value)
        }
        return val;
    }
    const contentWidth = useWindowDimensions().width;

    const addMore = _ => {
        if(totalValue()  >= plan[form.plan]){
            setExceeded(true);
            dispatch(edit({...form, value: totalValue()}))
            return;
        }
        
        setExceeded(false);

        if ('items' in form){
            let length = Object.entries(form.items).length
            
            dispatch(edit({...form, value: totalValue(), items: {...form?.items, [length]: {item: '', value: ''}}}));
            return
        }
        dispatch(edit({...form, value: totalValue(), items: {...form?.items, "0": {item: '', value: ''}}}));
        return
    }


    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? "padding": "position"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
            style={styles.form}
        >   
        <ScrollView>
            <Pressable onPress={_ => setShowInfo(true)}>
                <Text style={[styles.info, {color: colors.success}]}>More information about this product</Text>
            </Pressable>
            <View style={[styles.infoView, {borderColor: colors.success}]}>
                <Text style={[styles.infoText, {color: colors.text}]}>{'\u2B24'}  Bronze plan -- Sum insured on contents <Money amount="500000.00" /></Text>
                <Text style={[styles.infoText, {color: colors.text}]}>{'\u2B24'}  Silver plan -- Sum insured on contents <Money amount="750000.00" /></Text>
                <Text style={[styles.infoText, {color: colors.text}]}>{'\u2B24'}  Gold plan -- Sum insured on contents <Money amount="1000000.00" /></Text>
            </View>
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
            <OutlinedInput 
                placeholder="Referrer if any?."
                style={styles.input}
                value={form?.referrer}
                onChangeText={({nativeEvent}) => dispatch(edit({...form, referrer: nativeEvent.text}))}
            />
            {exceeded && <Text style={[styles.error, {color: colors.danger}]}>* Total amount for contents insured for selected plan exceeded</Text>}
            <Text style={{fontFamily: 'Montserrat_700Bold', marginVertical: 15, color: colors.text}}>Household Contents</Text>
            {form?.items && Object.entries(form.items).map((item,index) => (
                <Items 
                    key={`item${index}`} 
                    index={index} 
                />
            ))}
            <TouchableOpacity onPress={addMore}>
                <View>
                    <Text style={[styles.add, {color: colors.text}]}><Ionicons name="ios-add-circle" color={colors.info} size={20} />  Add more</Text>
                </View>
            </TouchableOpacity>
            </ScrollView>
            <Modal
                visible={showInfo}
                onRequestClose={_ => setShowInfo(false)}
                transparent={false}
            >
                <ScrollView style={{ flex: 1 }}>
                    <HTML
                        source={{html: `<div style="padding: 20px;">${productInfo}</div>`}}
                        contentWidth={contentWidth}
                    />
                </ScrollView>
            </Modal>
        </KeyboardAvoidingView>
        
        
        
    );
}

export const Items = ({index, onItemChange}) => {
    
    const {form} = useSelector(state => state.policies);
    const dispatch = useDispatch();
    const {colors} = useTheme();
    

    return (<View>
        <Text style={{fontFamily: "OpenSans_400Regular", color: colors.text}}>Item #{index+1}</Text>
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
    },
    add: {
        textAlign: "center",
        fontFamily: 'OpenSans_400Regular',
        textAlignVertical: "center"
    },
    infoView: {
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
    },
    infoText: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 10,
        textAlignVertical: 'center'
    },
    error: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 10,
    },
    info: {
        marginVertical: hp(1),
        fontFamily: 'Montserrat_400Regular',
        fontSize: wp(3),
        textDecorationLine: 'underline',
    }
})