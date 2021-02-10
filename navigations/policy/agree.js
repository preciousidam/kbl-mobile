import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import { Solidbutton } from '../../components/button';
import FocusAwareStatusBar from '../../components/statusBar';
import {bootstrap} from '../../store/reducers/app';



export const Agree = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {width, height} = useWindowDimensions();
    const {top, bottom} = useSafeAreaInsets();
    const {navigate} = navigation;
    const onPressTermPolicy = screen => navigate(screen);
    const dispatch = useDispatch();
    const onPress = _ => {
        dispatch(bootstrap({terms: true}));
    }



    return (
        <View style={[styles.container, {width, height, paddingTop: top, paddingBottom: bottom+10}]}>
            <View style={styles.first}>
                <Text style={[styles.headerText, {color: colors["primary"]}]}>Welcome to KBL Insurance app</Text>
                <Text 
                    style={styles.text}
                >
                    It is simple and easy; insure your assets on the go.
                </Text>
            </View>
            <View style={styles.second}>
                <Text
                    style={styles.terms}
                >
                    To continue, read and agree to the
                    <Text style={styles.inner} onPress={() => onPressTermPolicy('Policy')}> Terms of Service and Data Protection </Text>
                </Text>
                <Solidbutton 
                    text="Agree" 
                    style={styles.button}
                    onPress={onPress}
                />
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content'} backgroundColor={colors.background} />
        </View>
    );
}

export default Agree;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    first: {
        paddingTop: 100,
    },
    second: {
        width: '100%'
    },
    headerText: {
        fontFamily: 'Montserrat_400Regular',
        textAlign: "center",
        fontSize: 30,
        marginBottom: 20,
    },
    text:{
        fontFamily: 'Montserrat_400Regular',
        textAlign: "center",
        fontSize: 16,
    },
    terms: {
        fontFamily: 'OpenSans_400Regular',
        marginBottom: 20,
    },
    inner: {
        fontFamily: 'OpenSans_700Bold',
        textDecorationLine: 'underline'
    },
    button: {
        
    }
})