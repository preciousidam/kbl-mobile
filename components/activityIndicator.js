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
        width: 100,
        height: 100,
        padding: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff'
    },
})