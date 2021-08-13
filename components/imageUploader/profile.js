import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Image} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useTheme } from '@react-navigation/native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { Pressable } from 'react-native';
import { uploadProfileImage } from '../../store/reducers/auth';



export const ProfileImageUploader = () => {
    
    const { showActionSheetWithOptions } = useActionSheet();
    const options = ['Camera', 'Gallery', 'Cancel'];
    const {colors, dark} = useTheme();
    const dispatch =  useDispatch();
    const {user} = useSelector(state => state.auth);
    console.log(user)
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
        
            let pickerResult = await ImagePicker.launchImageLibraryAsync({quality: .4});
            
            if (pickerResult.cancelled === true) {
                return;
            }
            
            dispatch(uploadProfileImage(user?.pk, pickerResult));
       
    }

    const showOptions = _ => showActionSheetWithOptions({
        options,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 2,
        title: 'Complete action with',
        useModal: true,
        icons,
        containerStyle: {backgroundColor: colors.card},
        tintColor: colors.text,
        textStyle: {color: colors.text},
        titleTextStyle: {color: colors.text}
    },
    async (buttonIndex) => {
        if (buttonIndex === 0) {
            await openCameraAsync();
            return;
        }
        else if(buttonIndex === 1){
            await openImagePickerAsync();
            return;
        } 
        else return;
    })


    let openCameraAsync = async () => {
        
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
        }
        
        let pickerResult = await ImagePicker.launchCameraAsync({quality: .4});
        
        if (pickerResult.cancelled === true) {
            return;
        }
        
        dispatch(uploadProfileImage(user?.pk, pickerResult.uri));
      
    }

    

    if (!user?.profile_image){
        return (
            <Pressable onPress={showOptions}>
                <Avatar
                    icon={{name:"person"}}
                    size="medium" 
                    rounded 
                    containerStyle={{
                        backgroundColor: '#c6c6c6', 
                        marginRight: 12,
                    }} 
                />
            </Pressable>
        )
    }

    return (
        <Pressable onPress={showOptions}>
            <Avatar
                source={{ uri: user?.profile_image }} 
                size="medium" 
                rounded 
                containerStyle={{
                    backgroundColor: '#c6c6c6', 
                    marginRight: 12,
                }} 
            />
        </Pressable>
    )
}


const styles = StyleSheet.create({
    
    image: {
        width: '100%',
        height: hp('15%'),
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: wp("2"),
        marginVertical: hp("1"),
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