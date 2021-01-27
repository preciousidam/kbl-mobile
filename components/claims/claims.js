import React from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontiso from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const ClaimList = ({}) => {
    const {colors} = useTheme();
    const data = [
        {icon: <Ionicons name='ios-car' color={colors.primary} size={24} />, name: 'Toyota Pilot', amount: `${'\u20A6'} 70K`, status: 'Processing' },
        {icon: <Ionicons name='md-car' color={colors.primary} size={24} />, name: 'Nissan Majavo', amount: `${'\u20A6'} 140K`, status: 'Completed' },
        {icon: <Ionicons name='ios-home' color={colors.primary} size={24} />, name: '7B, Furo Ezimora, Lekki', amount: `${'\u20A6'} 1M`, status: 'Cancelled' },
        {icon: <Fontiso name='ship' color={colors.primary} size={24} />, name: 'Ship at Port', amount: `${'\u20A6'} 2M`, status: 'Processing' },
        {icon: <Ionicons name='ios-car' color={colors.primary} size={24} />, name: 'Toyota Pilot', amount: `${'\u20A6'} 70K`, status: 'Processing' },
        {icon: <Ionicons name='md-car' color={colors.primary} size={24} />, name: 'Nissan Majavo', amount: `${'\u20A6'} 140K`, status: 'Cancelled' },
        {icon: <Ionicons name='ios-home' color={colors.primary} size={24} />, name: '7B, Furo Ezimora, Lekki', amount: `${'\u20A6'} 1M`, status: 'Cancelled' },
        {icon: <Fontiso name='ship' color={colors.primary} size={24} />, name: 'Ship at Port', amount: `${'\u20A6'} 2M`, status: 'Completed' },
    ]
    
    const {navigate} = useNavigation()
    
    const renderItems = ({item, index}) => (
        <Activity
            {...item}
            index={index}
            onPress={_ => navigate('polDet', {id: item.id})}
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

export default ClaimList;

export const Activity = ({icon, amount, name, status, onPress, index}) => {
    const {colors, dark} = useTheme();
    const indicator = [ colors['danger'], colors['warning'], colors['success']]
    const statColor = {'Cancelled': 0, 'Processing': 1, 'Completed': 2};
    const icn = statColor[status] == 0? <MaterialCommunityIcons name="cancel" size={35} color={indicator[statColor[status]]} />:
        statColor[status] == 1?<MaterialIcons name="done" size={35} color={indicator[statColor[status]]} />: 
        <MaterialIcons name="done-all" size={35} color={indicator[statColor[status]]} />;
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
                <Text style={{color: indicator[statColor[status]], fontSize: 13,}}>{status}</Text>
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