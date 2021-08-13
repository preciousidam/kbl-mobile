import React from 'react';
import {View, TouchableOpacity,StyleSheet, Text} from 'react-native';
import { useTheme } from '@react-navigation/native';


export function CardSquare({icon, name, onPress}){

    
    const {colors} = useTheme();
    
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} >
            <View style={[{...styles.card, backgroundColor: colors.primary}]}>
                {icon}
                <Text style={styles.text}>{name}</Text> 
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    
    card: {
        borderRadius: 10,
        width: 160,
        paddingVertical: 20,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    h4: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 20,
    },
    text: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 14,
        color: '#fff',
    },
});