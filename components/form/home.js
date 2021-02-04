import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import { OutlinedInput } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';

const buildingType = ['Flat', 'Detached Bungalow', 'Detached Duplex', 
    'Terrace Bungalow', 'Detached Duplex', 'Semi-detached Duplex']

export const HomeForm = ({}) => {

    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    const {colors, dark} = useTheme();

    const [contents, setContents] = useState([{item: '', value: ''}])

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
                prompt="Select Plan"
                options={['Bronze', 'Silver', 'Gold']} 
                style={{padding: 0, marginVertical: 10,}}
                value={null}
                onValueChange={(item,i) => console.log(item)}
            />
            <Picker
                prompt="Select Building Type"
                options={buildingType} 
                style={{padding: 0, marginVertical: 10,}}
                value={null}
                onValueChange={(item,i) => console.log(item)}
            />
            <OutlinedInput 
                placeholder="Property Address"
                style={styles.input}
            />
            <Text style={{fontFamily: 'Montserrat_700Bold', marginVertical: 15,}}>Contents</Text>
            {contents.map(({item, value},index) => (
                <Items 
                    key={item+index} 
                    index={index} 
                    item={item} 
                    value={value} 
                    onItemChange={onTextChange}
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
    const [item, setItem] = useState('');
    const [value, setValue] = useState('');
    const onItemBlur = _ => onItemChange(index, item, 'item'); 
    const onValueBlur = _ => onItemChange(index, value, 'value'); 

    return (<View>
        <Text style={{fontFamily: "OpenSans_400Regular"}}>Item #{index+1}</Text>
        <OutlinedInput
            placeholder="Item"
            style={styles.input}
            value={item}
            onChangeText={({nativeEvent}) => setItem(nativeEvent.text)}
            onBlur={onItemBlur}
        />
        <OutlinedInput
            placeholder="Item value"
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
    add: {
        textAlign: "center",
        fontFamily: 'OpenSans_400Regular',
        textAlignVertical: "center"
    }
})