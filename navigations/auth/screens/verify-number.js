import { useTheme } from '@react-navigation/native';
import React, {useState} from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Text } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {SvgXml} from 'react-native-svg';

import { Solidbutton } from '../../../components/button';
import FocusAwareStatusBar from '../../../components/statusBar';
import {verify} from '../../../assets/verify';

export const Verify = ({navigation, route}) => {

    const CELL_COUNT = 6;
    const {top, bottom, right, left} = useSafeAreaInsets();
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    const {phone} = route.params;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT})
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({value, setValue});
    

    return (
        <View style={[styles.container, 
            {paddingBottom: bottom+ 20, paddingTop: top+100, backgroundColor: colors.card}]}
        >   
            <SvgXml xml={verify} width={150} height={100} />
            <Text style={styles.headerText}>OTP Verification</Text>
            <Text style={styles.subText}>
                Please enter the six digit code sent to +234-{phone}
            </Text>
            <View style={styles.code}>
                <CodeField 
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({index, symbol,isFocused}) => (
                        <Text
                        key={index}
                        style={[styles.cell, isFocused && {borderColor: colors.primary}]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                        
                        </Text>
                    )}
                />
            </View>
            <Solidbutton
                text="Verify"
                style={styles.button}
            />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content'} backgroundColor={colors.card} />
        </View>
    )
} 

export default Verify;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingHorizontal: 20,
        alignItems: "center"
    },
   
    headerText: {
        fontFamily: 'Montserrat_700Bold',
        marginTop: 20,
        fontSize: 20,
    },
    subText: {
        fontFamily: 'OpenSans_400Regular',
        marginTop: 10,
        fontSize: 14,
        textAlign: "center"
    },
    button: {
        width: '100%',
        marginVertical: 20,
    },
    textInput: {
        marginVertical: 30,
    },
    cell: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        
        marginHorizontal: 5,
        borderColor: '#00000030',
        textAlign: 'center',
        
    },
    focusCell: {
        borderColor: '#000',
    },
    code: {
        marginVertical: 50,
    },
})