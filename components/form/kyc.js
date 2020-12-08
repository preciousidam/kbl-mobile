import { useTheme } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { View, Platform, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {getCameraRollPermissionsAsync, launchImageLibraryAsync,
    requestCameraRollPermissionsAsync, MediaTypeOptions} from 'expo-image-picker';

import { IDS, STATE } from '../../constants';
import { OutlinedInput, OutlinedInputWithIcon } from '../input';
import {DynamicPicker, DynamicPickerIOS} from '../input/picker';
import { OutlinedDatePicker } from '../input/datepicker';


export const KYCIndividualForm = ({}) => {

    const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
    const {colors, dark} = useTheme();
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
    }, []);

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

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <OutlinedInput
                    placeholder="First name"
                    style={styles.input}
                />
                <OutlinedInput
                    placeholder="Last name"
                    style={styles.input}
                />
                <OutlinedInput
                    placeholder="Email"
                    style={styles.input}
                />
                <OutlinedInputWithIcon
                    icon={<Text>+234</Text>}
                    placeholder="Phone" 
                    style={styles.input}
                    keyboardType='phone-pad'
                    textContentType='telephoneNumber'
                    contProps={styles.input}
                />
                <OutlinedInput
                    placeholder="Address"
                    style={styles.input}
                />
                <Picker
                    prompt="State"
                    options={STATE} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={null}
                    onValueChange={(item,i) => console.log(item)}
                />
                <Picker
                    prompt="Gender"
                    options={['Male', 'Female']} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={null}
                    onValueChange={(item,i) => console.log(item)}
                />
                <Text style={styles.help}>Date of Birth</Text>
                <OutlinedDatePicker
                    placeholder="YYYY-MM-DD"
                    style={styles.input}
                    value={new Date()}
                />
                
                <OutlinedInput
                    placeholder="Occupation"
                    style={styles.input}
                />
                <Text style={{fontFamily: 'Montserrat_700Bold', marginVertical: 15,}}>Identification</Text>
                <Picker
                    prompt="Type of ID"
                    options={IDS} 
                    style={{padding: 0, marginVertical: 10,}}
                    value={null}
                    onValueChange={(item,i) => console.log(item)}
                />
                <OutlinedInput
                    placeholder="ID Number"
                    style={styles.input}
                />
                <Text style={styles.help}>Date Issued</Text>
                <OutlinedDatePicker
                    placeholder="YYYY-MM-DD"
                    style={styles.input}
                    value={new Date()}
                />
                <Text style={styles.help}>Expiry Date</Text>
                <OutlinedDatePicker
                    placeholder="YYYY-MM-DD"
                    style={styles.input}
                    value={new Date()}
                />
                <TouchableOpacity onPress={pickImage}>
                    <View style={[styles.image, {borderColor: colors.primary}]} >
                        <Ionicons name="ios-images" color={colors.info} size={60} />
                        <Text style={{fontFamily: 'OpenSans_400Regular'}}>Click to upload ID image</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
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
    }
})