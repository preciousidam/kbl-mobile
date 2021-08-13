import React, {createRef, useEffect, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';


export const CardNumberInputWithIcon = ({style, icon, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        if(focused) setBorderColor(colors.primary)
        else setBorderColor('#c6c6c6');
    }, [focused])

    function cc_format(value) {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []
        for (let i=0, len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
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
                value={cc_format(value)} 
                style={{...styles.input, color: colors.text, ...inputStyle}} 
                onChange={onChangeText}
                blurOnSubmit={true}
                keyboardType='numeric'
                placeholderTextColor="#c6c6c6"
                {...rest} 
            />
            <View style={styles.icon}>{icon}</View>
        </View>
    )
}

export const CardDateInputWithIcon = ({style, icon, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        if(focused) setBorderColor(colors.primary)
        else setBorderColor('#c6c6c6');
    }, [focused])

    const [borderColor, setBorderColor] = useState('#c6c6c6');

    function cc_expires_format(string) {
        return string.replace(
            /[^0-9]/g, '' // To allow only numbers
        ).replace(
            /^([2-9])$/g, '0$1' // To handle 3 > 03
        ).replace(
            /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^0{1,}/g, '0' // To handle 00 > 0
        ).replace(
            /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
        );
    }
    

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
                value={cc_expires_format(value)} 
                style={{...styles.input, color: colors.text, ...inputStyle}} 
                onChange={onChangeText}
                blurOnSubmit={true}
                placeholderTextColor="#c6c6c6"
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
                placeholderTextColor="#c6c6c6"
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