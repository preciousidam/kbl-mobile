import React, {createRef, useEffect, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
                placeholderTextColor="#c6c6c6"
                {...rest} 
            />
        </View>
    )
}

export const EmailOutlinedInput = ({style, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    
    const [focused, setFocused] = useState(false);
    const [valid, setValid] = useState(false);
    useEffect(() => {
        if(focused && valid) setBorderColor(colors.primary);
        else if (focused && valid == false) setBorderColor(colors.danger);
        else setBorderColor('#c6c6c6');
    }, [focused, value])

    const [borderColor, setBorderColor] = useState('#c6c6c6');
    const validate = _ => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(value) === false) {
            setValid(false);
            return false;
        }
        else {
            setValid(true);
        }
    }
    useEffect(() => {
        validate();
    }, [value]);
    

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
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email"
                placeholderTextColor="#c6c6c6"
                {...rest} 
            />
        </View>
    )
}


export const EmailOutlinedInputWithIcon = ({style, icon, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);
    const [valid, setValid] = useState(false);
    useEffect(() => {
        if(focused && valid) setBorderColor(colors.success);
        else if (focused && valid == false) setBorderColor(colors.danger);
        else setBorderColor('#c6c6c6');
    }, [focused, value])

    const [borderColor, setBorderColor] = useState('#c6c6c6');

    const validate = _ => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(value) === false) {
            setValid(false);
            return false;
        }
        else {
            setValid(true);
        }
    }

    useEffect(() => {
        validate();
    }, [value]);

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
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email"
                placeholderTextColor="#c6c6c6"
                {...rest} 
            />
        </View>
    )
}

export const PasswordOutlinedInputWithIcon = ({style, icon, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);
    const [valid, setValid] = useState(false);
    useEffect(() => {
        if(focused && valid) setBorderColor(colors.success);
        else if (focused && valid == false) setBorderColor(colors.danger);
        else setBorderColor('#c6c6c6');
    }, [focused, value])

    const [borderColor, setBorderColor] = useState('#c6c6c6');

    const validate = _ => {
        let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
        if (reg.test(value) === false) {
            setValid(false);
            return false;
        }
        else {
            setValid(true);
        }
    }

    useEffect(() => {
        validate();
    }, [value]);

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
                secureTextEntry={true}
                textContentType="newPassword"
                placeholder="Password"
                placeholderTextColor="#c6c6c6"
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
                placeholderTextColor="#c6c6c6"
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
                onChangeText={onChangeText}
                blurOnSubmit={true}
                placeholderTextColor="#c6c6c6"
                {...rest} 
            />
        </View>
    )
}

export const DateInput = ({style, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    
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
                placeholderTextColor="#c6c6c6"
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

export const TimeInput = ({style, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    
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
                placeholderTextColor="#c6c6c6"
                {...rest} 
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    mode='time'
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
        padding: wp("1%"),
        borderWidth: 1,
        borderRadius: wp("5%"),
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        fontFamily: 'Montserrat_400Regular',
        width: '100%',
        height: hp('6%'),
        fontSize: wp("3.3%"),
    },
    icon: {
        borderRightWidth: 1,
        borderRightColor: '#c6c6c6',
        paddingHorizontal: wp("2.6%"),
        marginRight: wp("2.5%")
    }
})