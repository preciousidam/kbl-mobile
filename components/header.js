import React from 'react';
import {View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Text, Avatar, Badge, withTheme, Button, Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';




export const Header = ({name, onNotClick}) => {
    const {colors} = useTheme();
    const notification = true;
    const {top, bottom} = useSafeAreaInsets();
    const paddingTop = Platform.OS == 'ios' ? top : 10;
    

    return (
        <View style={[styles.header,{paddingTop}]}>
            <View style={styles.headerprofile}>
                <Text style={styles.h4}>{name}</Text>
            </View>
            <TouchableOpacity onPress={onNotClick}>
                <View>
                    <Ionicons name='ios-notifications-outline' size={30} color={colors.highlight} />
                    {notification && <Badge status='error' containerStyle={{ position: 'absolute', top: 2, right: 1 }} />}
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    headerprofile: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    h4: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 25,
    },

});