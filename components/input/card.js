import React, {createRef, useEffect, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Ionicon from 'react-native-vector-icons/Ionicons';



export const CardNumberInputWithIcon = ({style, icon, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        if(focused) setBorderColor(colors.primary)
        else setBorderColor('#c6c6c6');
    }, [focused])

    const formatter = value => {
        let formatted = '';
        for(let i = 0; i < value.length; i){
            if(i % 4 == 0 && i != 0)
                formatted = `${formatted} ${value[i]}`
            else
            formatted = `${formatted}${value[i]}`
        }

        return formatted;
    }

    const [borderColor, setBorderColor] = useState('#c6c6c6');
    

    const onFocus = _ => setFocused(true);
    const onBlur = _ => setFocused(false);

    return (
        <View 
            {...contProps} 
            style={{...styles.container, ...style, borderColor,}}
        >   
            
            <TextInput 
                onFocus={onFocus} 
                onBlur={onBlur} 
                value={value} 
                style={{...styles.input, color: colors.text, ...inputStyle}} 
                onChange={onChangeText}
                blurOnSubmit={true}
                keyboardType='numeric'
                {...rest} 
            />
            <View style={styles.icon}>{icon}</View>
        </View>
    )
}


export const CardInputWithIcon = ({style, icon, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        if(focused) setBorderColor(colors.primary)
        else setBorderColor('#c6c6c6');
    }, [focused])

    const [borderColor, setBorderColor] = useState('#c6c6c6')
    

    const onFocus = _ => setFocused(true);
    const onBlur = _ => setFocused(false);

    return (
        <View 
            {...contProps} 
            style={{...styles.container, ...style, borderColor,}}
        >   
            
            <TextInput 
                onFocus={onFocus} 
                onBlur={onBlur} 
                value={value} 
                style={{...styles.input, color: colors.text, ...inputStyle}} 
                onChange={onChangeText}
                blurOnSubmit={true}
                {...rest} 
            />
            <View style={styles.icon}>{icon}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        fontFamily: 'Montserrat_400Regular',
        width: '100%',
        height: 50,
        flex: 4,
    },
    icon: {
        borderRightColor: '#c6c6c6',
        marginLeft: 10,
        flex: 1
    }
})