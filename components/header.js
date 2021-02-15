import React from 'react';
import {View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Text, Avatar, Badge, withTheme, Button, Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';




export const Header = ({name, onNotClick}) => {
    const count = useSelector(state => state.notifications.filter(({read}) => read === false).length);
    const {colors} = useTheme();
    const notification = count > 0;
    const {top, bottom} = useSafeAreaInsets();
    const paddingTop = Platform.OS == 'ios' ? top : 10;
    const navigation = useNavigation();
    

    return (
        <View style={[styles.header,{paddingTop}]}>
            <View style={styles.headerprofile}>
                <TouchableOpacity onPress={_ => navigation.toggleDrawer()}>
                    <View style={styles.more}>
                        <Ionicons name='ios-menu' size={30} color={colors.text} />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.h4, {color: colors.text}]}>{name}</Text>
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

export const ActionHeader = ({name, onPress}) => {
    const {colors} = useTheme();
    const {top, bottom} = useSafeAreaInsets();
    const paddingTop = Platform.OS == 'ios' ? top : 10;
    

    return (
        <View style={[styles.header,{paddingTop, backgroundColor: colors.card}]}>
            <View style={styles.headerprofile}>
                <Text style={[styles.h4, {color: colors.text}]}>{name}</Text>
            </View>
            <TouchableOpacity onPress={onPress} activeOpacity={.8}>
                <View style={[styles.action, {backgroundColor: colors.primary}]}>
                    <Ionicons name='ios-add' size={30} color='#fff' />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const FormHeader = ({name, onPress, Icon, onBackPress}) => {
    const {colors} = useTheme();
    const {top, bottom} = useSafeAreaInsets();
    const paddingTop = Platform.OS == 'ios' ? top : 10;
    const {goBack} = useNavigation()
    


    return (
        <View style={[styles.header,{paddingTop, backgroundColor: colors.card, elevation: 2}]}>
            <View style={styles.headerprofile}>
                <TouchableOpacity onPress={onBackPress? _ => onBackPress(): _ => goBack()} activeOpacity={.8}>
                    <View style={{height: 50, justifyContent: "center", alignItems: 'center', paddingRight: 30}}>
                        <Ionicons name="ios-arrow-back" size={24} color={colors.text} />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.h4, {fontSize: 18, color: colors.text}]}>{name}</Text>
            </View>
            <TouchableOpacity onPress={onPress} activeOpacity={.8}>
                <View style={[styles.next, {backgroundColor: colors.primary}]}>
                    <Text style={styles.actionText}>Next</Text>
                    <Text style={styles.icon}><Icon /></Text>
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
        alignItems: "center",
    },
    h4: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 25,
    },
    action: {
        width: 50,
        height:50,
        elevation: 1,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    next: {
        elevation: 1,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 5,
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        textAlign: "center",
        textAlignVertical: "center",
        borderWidth: 1,
        borderColor: '#fff',
    },
    actionText: {
        color: '#fff',
        marginHorizontal: 10,
        fontFamily: 'OpenSans_700Bold'
    },
    more: {
        marginRight: 10,
    }

});