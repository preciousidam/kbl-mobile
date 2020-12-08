import React from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontiso from 'react-native-vector-icons/Fontisto';


export const PolicyList = ({}) => {
    const {colors} = useTheme();
    const data = [
        {icon: <Ionicons name='ios-car' color={colors.primary} size={24} />, name: 'Toyota Pilot', amount: `${'\u20A6'} 70K`, expire: '05-10-20' },
        {icon: <Ionicons name='md-car' color={colors.primary} size={24} />, name: 'Nissan Majavo', amount: `${'\u20A6'} 140K`, expire: '21-12-21' },
        {icon: <Ionicons name='ios-home' color={colors.primary} size={24} />, name: '7B, Furo Ezimora, Lekki', amount: `${'\u20A6'} 1M`, expire: '12-12-21' },
        {icon: <Fontiso name='ship' color={colors.primary} size={24} />, name: 'Ship at Port', amount: `${'\u20A6'} 2M`, expire: '05-10-20' },
        {icon: <Ionicons name='ios-car' color={colors.primary} size={24} />, name: 'Toyota Pilot', amount: `${'\u20A6'} 70K`, expire: '05-10-20' },
        {icon: <Ionicons name='md-car' color={colors.primary} size={24} />, name: 'Nissan Majavo', amount: `${'\u20A6'} 140K`, expire: '21-12-21' },
        {icon: <Ionicons name='ios-home' color={colors.primary} size={24} />, name: '7B, Furo Ezimora, Lekki', amount: `${'\u20A6'} 1M`, expire: '12-12-21' },
        {icon: <Fontiso name='ship' color={colors.primary} size={24} />, name: 'Ship at Port', amount: `${'\u20A6'} 2M`, expire: '05-10-20' },
    ]
    
    const {navigate} = useNavigation()
    
    const renderItems = ({item, index}) => (
        <Activity
            {...item}
            onPress={_ => navigate('Overview', {id: item.id})}
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

export const Activity = ({icon, amount, name, expire}) => {
    const {colors, dark} = useTheme();
    return (
        <TouchableOpacity activeOpacity={.8}>
            <View style={[styles.update, {backgroundColor: colors.card}]}>
                <View style={styles.amount}>
                    {icon}
                    <Text style={styles.bold}>{amount}</Text>
                </View>
                <View style={{marginVertical: 10,}}>
                    <Text style={styles.bold}>{name}</Text>
                </View>
                <Text style={{color: '#858585', fontSize: 13,}}>Coverage expires {expire}</Text>
                <Text style={styles.shield}><MaterialCommunityIcons name="shield-check" size={35} color="#858585" /></Text>
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