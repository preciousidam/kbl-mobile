import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Modal, ActivityIndicator, View, StyleSheet } from 'react-native';


export const ActInd = ({status}) => {
    const {colors, dark} = useTheme();
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={status}
        >
            <View style={styles.modal}>
                <View style={styles.indicator}><ActivityIndicator size="large" color={colors.info} /></View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    indicator: {
        width: 65,
        height: 65,
        padding: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 32,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: 'rgba(0,0,0,.4)'
    },
})