import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';

import {loadFonts} from '../styles/fonts';
import { restore } from '../store/reducers/auth';
import {retrieveProductsAsync,bootstrap} from '../store/reducers/app';
import FocusAwareStatusBar from '../components/statusBar';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



export function SplashScreen({theme}){
    const {colors, dark} = useTheme();

    const dispatch = useDispatch();

    const fontLoaded = loadFonts();

    const setup = async () => {
        const user = await AsyncStorage.getItem('user');
        const app = await AsyncStorage.getItem('apps')
       

        dispatch(bootstrap(JSON.parse(app)));
        dispatch(restore({user: JSON.parse(user)}));
        //dispatch(restore({user: null}));
    }

    useEffect(() => {
        setup();
    },[])

    return (
        fontLoaded && (<View style={{...styles.container, backgroundColor: !dark ? colors.primary: colors.card}}>
            <View style={styles.imageBack}>
                <Image 
                    source={require('../assets/logo.png')}
                    style={styles.image}
                />
            </View>
            <Text style={{...styles.subText, color: dark? colors.primary :colors['primary-dark'], fontFamily: "OpenSans_700Bold"}}>KBL Insurance App</Text>
            <FocusAwareStatusBar barStyle='light-content' backgroundColor={dark ? colors.card : colors.primary} />
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
        paddingVertical: hp('2%'),
    },
    subText: {
        position: "absolute",
        bottom: hp('2.5%'),
    },
    image: {
        resizeMode: 'contain',
        width: wp('55%'),
        height: hp('15%')
    },
    imageBack: {
        width: wp('55%'),
        height: hp('15%'),
        borderRadius: wp('2%'),
        backgroundColor: '#fff',
        paddingVertical: hp('0.3%'),
        justifyContent: 'center',
        alignItems: 'center',
    }
})