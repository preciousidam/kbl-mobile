import React, {createRef, useEffect, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Ionicon from 'react-native-vector-icons/Ionicons';

export const OutlinedInput = ({style, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
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
            style={{...styles.container, ...style, borderColor}}
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
        </View>
    )
}

export const OutlinedInputWithIcon = ({style, icon, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
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
            style={{...styles.container, ...style, borderColor, padding: 5,}}
        >   
            <View style={styles.icon}>{icon}</View>
            <TextInput 
                onFocus={onFocus} 
                onBlur={onBlur} 
                value={value} 
                style={{...styles.input, color: colors.text, ...inputStyle}} 
                onChange={onChangeText}
                blurOnSubmit={true}
                {...rest} 
            />
        </View>
    )
}


export const SearchInput = ({style, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        if(focused) setBorderColor(colors.primary)
        else setBorderColor('transparent');
    }, [focused])

    const [borderColor, setBorderColor] = useState('transparent')
    

    const onFocus = _ => setFocused(true);
    const onBlur = _ => setFocused(false);

    return (
        <View 
            {...contProps} 
            style={{...styles.container, ...style, borderColor, backgroundColor: focused? 'transparent':'#d8d8d8'}}
        >   
            <View style={{marginRight: 10}}>
                <Ionicon name='md-search' size={20} color={colors.highlight} />
            </View>
            <TextInput 
                onFocus={onFocus} 
                onBlur={onBlur} 
                value={value} 
                style={{...styles.input, color: colors.text, ...inputStyle,}} 
                onChange={onChangeText}
                blurOnSubmit={true}
                {...rest} 
            />
        </View>
    )
}

export const DateInput = ({style, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    console.log(value)
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        if(focused) setBorderColor(colors.secondary)
        else setBorderColor('#c6c6c6');
    }, [focused])

    const [borderColor, setBorderColor] = useState('#c6c6c6')
    const [show, setShow] = useState(false);

    const onFocus = _ => {
        setFocused(true);
        setShow(true);
    }
    const onBlur = _ => {
        setFocused(false);
        setShow(false);
    }

    return (
        <View 
            {...contProps} 
            style={{...styles.container, ...style, borderColor}}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <TextInput 
                onFocus={onFocus} 
                onBlur={onBlur} 
                value={moment(value).format('DD/MM/YYYY')}
                style={{...styles.input, color: colors.text, ...inputStyle}} 
                onChange={onChangeText}
                blurOnSubmit={true}
                {...rest} 
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    mode='date'
                    display="default"
                    onChange={onChangeText}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        fontFamily: 'Montserrat_400Regular',
        width: '100%',
        height: 50,
    },
    icon: {
        borderRightWidth: 1,
        borderRightColor: '#c6c6c6',
        paddingHorizontal: 10,
        marginRight: 10
    }
})