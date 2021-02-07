import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import { ActInd } from '../../../../components/activityIndicator';
import FocusAwareStatusBar from '../../../../components/statusBar';


export const Products = ({}) => {
    const {colors, dark} = useTheme();
    const [loading, setLoading] = useState(false);

    const onLoad = syntheticEvent => {
        const { nativeEvent } = syntheticEvent;
        setLoading(nativeEvent.loading);
    }
   
    return (
        <View style={styles.container}>
            <WebView 
                source={{ uri: 'https://kblinsurance.com/personal-insurance/' }} 
                onLoadStart={onLoad}
                onLoadEnd={onLoad}
            />
            <ActInd status={loading} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content'} backgroundColor={colors.card} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})