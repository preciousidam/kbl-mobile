import { useFocusEffect, useTheme } from '@react-navigation/native';
import React, { createRef, forwardRef, useCallback, useEffect, useRef } from 'react';
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Ionicons} from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment';
import * as Updates from 'expo-updates';

import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import FocusAwareStatusBar from '../../../../components/statusBar';
import {Header} from '../../../../components/header';
import ProductList from '../../../../components/policy/quickLinks';
import { useSelector, useDispatch } from 'react-redux';
import {retrieveActivitiesAsync} from '../../../../store/reducers/app';
import { Alert } from 'react-native';


export const Dashboard = ({navigation}) => {
    const {colors, dark} = useTheme();
    const flatlist = useRef();
    
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveActivitiesAsync(user?.pk));
        return;
    }, []);

    useFocusEffect(useCallback(() => {
        dispatch(retrieveActivitiesAsync(user?.pk))
        return
    }));
    

    return (
        <View style={[styles.container, {backgroundColor: dark? colors.background:colors.card}]}>
           <Header name="Home"  
                onNotClick={_ => navigation.navigate('Notifications')}
           />
            <ScrollView >
                <View style={{marginTop: 20}}>
                    <View style={styles.more}>
                        <Text style={[styles.headerText, {color: colors.text}]}>Products</Text>
                        <TouchableOpacity 
                            activeOpacity={.7} 
                            style={{flexDirection: 'row'}}
                            onPress={() => console.log(flatlist)}
                        >
                            <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>more</Text>
                            <Ionicons name="arrow-forward" size={24} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <ProductList />
                </View>
                <View >
                    <Text style={[styles.headerText, {color: colors.text}]}>Quick Actions</Text>
                    <View style={styles.quickAct}>
                        <CardSquare 
                            icon={<AntDesign name="form" size={28} color="#fff" />} 
                            name="Claims"
                            onPress={_ => navigation.navigate("new_claim", { screen: 'new', params:{id: null}})}
                        />
                        <CardSquare 
                            icon={<MaterialCommunityIcons name="shield-home" size={28} color="#fff" />} 
                            name="Policies"
                            onPress={_ => navigation.navigate("new_policy", { screen: 'new', params:{id: null}})}
                        />
                        <CardSquare 
                            icon={<AntDesign name="customerservice" size={28} color="#fff" />} 
                            name="Help"
                            onPress={_ => navigation.navigate("help")}
                        />
                        
                    </View>
                </View>
                <View style={{...styles.callToAction}}>
                    <Text style={{...styles.callText, color: colors.text}}>
                        Please take a few moment to complete your KYC 
                        required from all our customers.
                    </Text>
                    <Button onPress={() => navigation.navigate('KYC')} buttonStyle={{width: 150}} title="Update" />
                </View>
                <Activities />
            </ScrollView>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={ dark? colors.background:colors.card} />
        </View>
    )
}

export default Dashboard;

export const CardSquare = ({icon, name, onPress}) => {  
    const {colors} = useTheme();
    
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} >
            <View style={[{...styles.card, backgroundColor: colors.primary}]}>
                {icon}
                <Text style={{...styles.text, color: '#ffffff', fontSize: 12}}>{name}</Text> 
            </View>
        </TouchableOpacity>
    )
}

export const Activities = ({}) => {
    const {activities} = useSelector(state => state.app);
    const {colors, dark} = useTheme();

    const empty = (
        <View style={{marginVertical: 15, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../../../assets/empty.png')} style={{width: 100,height: 80}} />
            <Text style={{fontFamily: 'OpenSans_400Regular', marginVertical: 10}}>Nothing to see here</Text>
        </View>
    )
    
    return (
        <View style={{marginVertical: 20, paddingHorizontal: 15}}>
            <Text 
                style={[styles.headerText, {color: colors.text, paddingLeft: 0, marginBottom: 15}]}
            >
                Recent Activities
            </Text>
            {activities.length <= 0 ? empty : activities?.slice(0,11).map((activity,i) => <Activity key={`${i}`} {...activity} />)}
        </View>
    )
}

export const Activity = ({type, desc, when}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={[styles.update, {backgroundColor: colors.card}]}>
            <Text style={[styles.updateText, {color: colors.text}]}>{type}</Text>
            <View style={styles.apart}>
                <Text style={[styles.updateText, {fontFamily: 'OpenSans_400Regular', color: colors.text}]}>{desc}</Text>
                <Text style={styles.icon}><MaterialCommunityIcons name="file-cabinet" size={24} color="#fff" /></Text>
            </View>
            <Text style={{fontFamily: 'OpenSans_400Regular', color: colors.text}}>{moment(when).fromNow()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    callToAction: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    callText: {
        textAlign: "center", 
        marginBottom: 20, 
        fontFamily: 'OpenSans_400Regular',
        padding: 5,
    },
    headerText: {
        fontFamily: 'Montserrat_700Bold',
        paddingHorizontal: 15,
    },
    quickAct: {
        paddingHorizontal: 15, 
        marginVertical: 30,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    card: {
        borderRadius: 10,
        padding: 20,
        width: 115,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    h4: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 20,
    },
    text: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 14,
        color: '#fff',
    },
    headerprofile: {
        flexDirection: "row",
    },
    text: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 14,
    },
    update: {
        padding: 10,
        width: '100%',
        marginVertical: 10,
        borderColor: "transparent",
        borderWidth: 1,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: '#fff',
    },
    updateText: {
        fontFamily: 'Montserrat_700Bold',
        marginVertical: 5,
        flex: 9,
    },
    apart: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        flex: 1.5,
        width: 50,
        height: 50,
        backgroundColor: "#a5a5a5",
        borderRadius: 25,
        textAlign: "center",
        textAlignVertical: "center",
    },
    more: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15,
    }
});