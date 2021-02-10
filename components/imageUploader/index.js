import React, {Component, useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {View, Text, Platform, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useTheme } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { Modal } from 'react-native';



export const ImageUploader = ({image, callback, text}) => {
    
    const { showActionSheetWithOptions } = useActionSheet();
    const options = ['Camera', 'Gallery', 'Cancel'];
    const {colors, dark} = useTheme();
    const [view, setView] = useState(false);
    const icons = [
        <Image source={require('../../assets/photo.png')} style={styles.icon} />,
        <Image source={require('../../assets/gallery.png')} style={styles.icon} />,
        <Image source={require('../../assets/x-button.png')} style={styles.icon} />,
    ]

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
            callback(pickerResult);
       
    }

    const showOptions = _ => showActionSheetWithOptions({
        options,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 2,
        title: 'Complete action with',
        useModal: true,
        icons,
    },
    (buttonIndex) => {
        if (buttonIndex === 0) {
            openCameraAsync();
            return;
        }
        else if(buttonIndex === 1){
            openImagePickerAsync();
            return;
        } 
        else return;
    })

    const clearImage = _ => {
        callback(null);
    }

    const changeImage = _ => {
        showOptions()
    }

    let openCameraAsync = async () => {
        
            let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
            if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
            }
            
            let pickerResult = await ImagePicker.launchCameraAsync();
            
            if (pickerResult.cancelled === true) {
                return;
            }
            
            callback(pickerResult);
      
    }

    

    const change = (
        <TouchableOpacity onPress={changeImage}>
            <View style={styles.actionBtn}>
                <Ionicons name="pencil" size={24} color={colors.primary} />
                <Text style={{fontSize: 10, fontFamily: 'OpenSans_400Regular'}}>Change</Text>
            </View>
        </TouchableOpacity>
    )

    const clear = (
        <TouchableOpacity onPress={clearImage}>
            <View style={styles.actionBtn}>
                <Ionicons name="close" size={24} color={colors.danger} />
                <Text style={{fontSize: 10, fontFamily: 'OpenSans_400Regular'}}>Clear</Text>
            </View>
        </TouchableOpacity>
    )
    

    if (!image){
        return (
            <TouchableOpacity onPress={showOptions}>
                <View style={[styles.image, {borderColor: colors.primary}]} >
                    <Ionicons name="ios-images" color={colors.info} size={60} />
                    <Text style={{fontFamily: 'OpenSans_400Regular'}}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.image, {borderColor: colors.primary, flexDirection: 'row'}]}>
            <TouchableOpacity onPress={_ => setView(true)}>
                <Image source={{uri: image?.uri || image}} style={{width: 150, height: 100, marginRight: 20,}} />
            </TouchableOpacity>
            
            <View style={styles.actionBtn}>
                {change}
                {clear}
            </View>
            <Modal
                transparent={false}
                visible={view}
                onRequestClose={_ => setView(false)}
            >
                <View style={styles.imageView}>
                    <Image 
                        source={{uri: image?.uri || image}} 
                        style={styles.fullImage}
                    />
                </View>
            </Modal>
        </View>
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
    },
    icon: {
        width: 36,
        height: 36,
    },
    actionBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        borderRadius: 32,
    },  
    imageView: {
        width: '100%', 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    fullImage: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
    }
})