import React from 'react';
import {View, TouchableOpacity,StyleSheet, Text} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


export function CardSquare({icon, name, onPress}){

    const {colors} = useTheme();
    
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} >
            <View style={[{...styles.card, backgroundColor: colors.primary}]}>
                {icon}
                <Text style={[styles.text, {color: "#fff"}]}>{name}</Text> 
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    
    card: {
        borderRadius: 10,
        width: wp("36%"),
        paddingVertical: hp("2%"),
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    h4: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: wp("3%"),
    },
    text: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: wp("2.5%"),
        color: '#fff',
    },
});