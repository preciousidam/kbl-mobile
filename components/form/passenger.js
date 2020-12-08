import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native';


import { OutlinedInput } from '../input';


export const PassengerForm = ({}) => {
   
    return (
        <View style={styles.form}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios'? "padding": "position"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
            >
                <OutlinedInput 
                    placeholder="Point of Departure"
                    style={styles.input}
                />
                <OutlinedInput 
                    placeholder="Point of Arrival"
                    style={styles.input}
                />
                <OutlinedInput 
                    placeholder="Bus Registration"
                    style={styles.input}
                />
                <Text style={{fontFamily: 'Montserrat_700Bold', marginVertical: 15,}}>Next of kin info</Text>
                <OutlinedInput 
                    placeholder="Full name"
                    style={styles.input}
                />
                <OutlinedInput 
                    placeholder="Phone"
                    style={styles.input}
                />  
                <OutlinedInput 
                    placeholder="Relationship"
                    style={styles.input}
                />  
            </KeyboardAvoidingView>
        </View>
    );
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