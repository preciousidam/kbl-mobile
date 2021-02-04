import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import {loadFonts} from '../styles/fonts';
import { restore } from '../store/reducers/auth';
import {retrieveProductsAsync,bootstrap} from '../store/reducers/app';
import FocusAwareStatusBar from '../components/statusBar';



export function SplashScreen({theme}){
    const {colors, dark} = useTheme();

    const dispatch = useDispatch();

    const fontLoaded = loadFonts();

    const setup = async () => {
        const user = await AsyncStorage.getItem('user');
        const app = await AsyncStorage.getItem('apps')
       

        dispatch(bootstrap(JSON.parse(app)));
        dispatch(retrieveProductsAsync());
        dispatch(restore({user: JSON.parse(user)}));
        //dispatch(restore({user: null}));
    }

    useEffect(() => {
        setup();
    },[])

    return (
        fontLoaded && (<View style={{...styles.container, backgroundColor: colors['primary']}}>
            <Image 
                source={require('../assets/logo.png')}
                style={styles.image}
            />
            <Text style={{...styles.subText, color: colors['primary-dark'], fontFamily: "OpenSans_700Bold"}}>KBL Insurance App</Text>
            <FocusAwareStatusBar barStyle={dark? 'dark-content': 'light-content'} backgroundColor={colors.primary} />
        </View>)
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    subText: {
        position: "absolute",
        bottom: 20,
    },
    image: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "transparent",
        paddingVertical: 10, 
    }
})