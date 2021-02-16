import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


export const Outlinedbutton = ({text, onPress, style, textStyle}) =>{
    const {colors} = useTheme()
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container}} activeOpacity={0.8}>
            <View style={{...styles.outlined, borderColor: colors.primary, ...style}}>
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const Solidbutton = ({text, onPress, style, textStyle}) =>{
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container}} activeOpacity={0.8}>
                <View style={[{...styles.grad, borderRadius: 25, backgroundColor: '#00AFED'},style]} >
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
                </View>
        </TouchableOpacity>
    )
}

export const SolidbuttonWithIcon = ({text, onPress, style, gradColors, textStyle, icon}) =>{
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container}} activeOpacity={0.8}>
                <LinearGradient start={[0.7,0.2]} colors={gradColors || ['#f5af19', '#FF9D14']} style={[{...styles.grad, borderRadius: 25},style]} >
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
                    <View style={styles.icon}>{icon}</View>
                </LinearGradient>
        </TouchableOpacity>
    )
}

export const GradientButton = ({text, onPress, style, gradColors, textStyle}) => {

    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container, ...style}} activeOpacity={0.7}>
            <View style={styles.view}>
                <LinearGradient start={[0.7,0.2]} colors={gradColors || ['#f5af19', '#FF9D14']} style={styles.grad} >
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

export const FloatingActionButton = ({icon, onPress, style}) => {
    const {colors} = useTheme();
    return (
        <TouchableOpacity 
            onPress={onPress} 
            activeOpacity={0.8} 
            style={[{position: "absolute", bottom: hp(30), right: wp(30)}, style]}
        >
            <View style={[styles.actionBtn, {backgroundColor: colors.primary}]}>
                {icon}
            </View>
        </TouchableOpacity>
    )
}

Solidbutton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

Outlinedbutton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

FloatingActionButton.propTypes = {
    icon: PropTypes.element.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

FloatingActionButton.propTypes = {
    icon: PropTypes.element.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

SolidbuttonWithIcon.propTypes = {
    icon: PropTypes.element.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    text: PropTypes.string.isRequired,
    textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    gradColors: PropTypes.array,
}

GradientButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    text: PropTypes.string.isRequired,
    textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    gradColors: PropTypes.array,
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    text: {
        fontFamily: 'Montserrat_700Bold',
        color: '#ffffff',
        fontSize: wp("3.5%")
    },
    grad: {
        width: '100%',
        padding: wp("3.5%"),
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: wp(10),
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "row"
    },
    outlined: {
        padding: wp("3.5%"),
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: wp("5%"),
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: wp(30),
    },
    actionBtn: {
        width: wp(60),
        height: hp(60),
        borderRadius: wp(30),
        borderWidth: 1,
        borderColor: 'transparent',
        padding: wp(20),
        elevation: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        position: "absolute",
        right: 8,
        backgroundColor: '#000000',
        padding: wp("2.5%"),
        borderWidth: 1,
        borderRadius: wp("5%"),
    },
})