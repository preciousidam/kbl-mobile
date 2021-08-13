import React from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Money } from '../money';
import { retrieveClaimAsync } from '../../store/reducers/claims';


export const ClaimList = ({}) => {
    const {claims, processing} = useSelector(state => state.claims);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const {navigate} = useNavigation();
    
    const refresh = () => {
        dispatch(retrieveClaimAsync(user.pk));
    }
    
    
    const renderItems = ({item, index}) => (
        <Activity
            {...item}
            index={index}
            onPress={_ => navigate('', {id: item.id})}
        />);

    return(
        <View style={styles.container}>
           <FlatList
                refreshing={processing}
                onRefresh={refresh}
                data={claims}
                keyExtractor={(item,i) => item.claims_number+i}
                renderItem={renderItems}
                contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 50,}}
                ListEmptyComponent={Empty}
            />
        </View>
    )
}

export default ClaimList;

export const Empty = _  => {
    return (
        <View style={{
            minHeight: Dimensions.get('window').height - 150, 
            flex: 1, 
            backgroundColor: '#fff', 
            alignItems: 'center', 
            justifyContent: 'center'
        }}>
            <Image style={{width: 100, height: 100}} source={require('../../assets/no_data.png')} />
            <Text style={{fontFamily: 'Montserrat_700Bold', color: '#A6A6A6'}}>Nothing to see here!</Text>
        </View>
    )
}

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