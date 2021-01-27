import React from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontiso from 'react-native-vector-icons/Fontisto';
import { checkExpiry } from '../../utility';


export const PolicyList = ({}) => {
    const {colors} = useTheme();
    const data = [
        {icon: <Ionicons name='ios-car' color={colors.primary} size={24} />, name: 'Toyota Pilot', amount: `${'\u20A6'} 70K`, expire: '05-10-2020' },
        {icon: <Ionicons name='md-car' color={colors.primary} size={24} />, name: 'Nissan Majavo', amount: `${'\u20A6'} 140K`, expire: '21-12-2021' },
        {icon: <Ionicons name='ios-home' color={colors.primary} size={24} />, name: '7B, Furo Ezimora, Lekki', amount: `${'\u20A6'} 1M`, expire: '12-02-2021' },
        {icon: <Fontiso name='ship' color={colors.primary} size={24} />, name: 'Ship at Port', amount: `${'\u20A6'} 2M`, expire: '05-10-2020' },
        {icon: <Ionicons name='ios-car' color={colors.primary} size={24} />, name: 'Toyota Pilot', amount: `${'\u20A6'} 70K`, expire: '05-03-2021' },
        {icon: <Ionicons name='md-car' color={colors.primary} size={24} />, name: 'Nissan Majavo', amount: `${'\u20A6'} 140K`, expire: '21-12-2021' },
        {icon: <Ionicons name='ios-home' color={colors.primary} size={24} />, name: '7B, Furo Ezimora, Lekki', amount: `${'\u20A6'} 1M`, expire: '12-04-2021' },
        {icon: <Fontiso name='ship' color={colors.primary} size={24} />, name: 'Ship at Port', amount: `${'\u20A6'} 2M`, expire: '05-10-2020' },
    ]
    
    const {navigate} = useNavigation()
    
    const renderItems = ({item, index}) => (
        <Activity
            {...item}
            index={index}
            onPress={_ => navigate("new_policy", {screen: 'polDet', params: {id: item.id}})}
        />);

    return(
        <View style={styles.container}>
           <FlatList 
                data={data}
                keyExtractor={(item,i) => item.name+i}
                renderItem={renderItems}
                contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 50,}}
            />
        </View>
    )
}

export default PolicyList;

export const Activity = ({icon, amount, name, expire, onPress, index}) => {
    const {colors, dark} = useTheme();
    const indicator = [ colors['danger'], colors['warning'], colors['success']]
    const expired = checkExpiry(expire);
    const icn = expired == 0? <MaterialCommunityIcons name="shield-off" size={35} color={indicator[expired]} />:
        <MaterialCommunityIcons name="shield-check" size={35} color={indicator[expired]} />;
    return (
        <TouchableOpacity activeOpacity={.8} onPress={onPress}>
            <View style={[styles.update, {backgroundColor: colors.card}]}>
                <View style={styles.amount}>
                    {icon}
                    <Text style={styles.bold}>{amount}</Text>
                </View>
                <View style={{marginVertical: 10,}}>
                    <Text style={styles.bold}>{name}</Text>
                </View>
                <Text style={{color: '#858585', fontSize: 13,}}>Coverage expires {expire}</Text>
                <Text style={styles.shield}>{icn}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginVertical: 20,
        marginTop: 10,
    },
    update: {
        padding: 15,
        width: '100%',
        marginVertical: 5,
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 10,
        elevation: 2,
        position: "relative",
    },
    updateText: {
        fontFamily: 'Montserrat_700Bold', 
    },
    amount:{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    bold: {
        fontFamily: 'OpenSans_700Bold',
    },
    shield: {
        position: "absolute",
        right: 15,
        top: '50%'
    }
});