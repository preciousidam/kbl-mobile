import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Platform, KeyboardAvoidingView, Text} from 'react-native';
import { OutlinedInput } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';

export const MarineForm = () => {

    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    const {colors, dark} = useTheme();
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios'? "padding": "position"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
            >
                <Picker
                    prompt="Select clause"
                    options={['Clause A', 'Clause C']} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={null}
                    onValueChange={(item,i) => console.log(item)}
                />
                <OutlinedInput
                    placeholder="Cost of Freight"
                    style={styles.input}
                />
                <OutlinedInput
                    placeholder="Type of goods"
                    style={styles.input}
                />
                <Picker
                    prompt="Country of Origin"
                    options={['China', 'USA']} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={null}
                    onValueChange={(item,i) => console.log(item)}
                />
                <Picker
                    prompt="Port of Discharge"
                    options={['Lagos', 'Port Harcourt']} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={null}
                    onValueChange={(item,i) => console.log(item)}
                />
                <Text style={{fontFamily: 'Montserrat_700Bold', marginVertical: 15,}}>Form M</Text>
                <OutlinedInput
                    placeholder="Cost of Freight"
                    style={styles.input}
                />
                <OutlinedInput
                    placeholder="Type of goods"
                    style={styles.input}
                />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 10,
        marginVertical: 10,
    },
});