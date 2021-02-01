import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'

import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import FocusAwareStatusBar from '../../../../components/statusBar';
import {Header} from '../../../../components/header';
import ProductList from '../../../../components/policy/quickLinks';


export const Dashboard = ({navigation}) => {
    const {colors, dark} = useTheme();
    

    return (
        <View style={[styles.container, {backgroundColor: colors.card}]}>
           <Header name="Home" />
            <ScrollView >
                <View style={{marginTop: 20}}>
                    <Text style={[styles.headerText, {color: colors.text}]}>Products</Text>
                    <ProductList />
                </View>
                <View >
                    <Text style={[styles.headerText, {color: colors.text}]}>Quick Actions</Text>
                    <View style={styles.quickAct}>
                        <CardSquare 
                            icon={<MaterialCommunityIcons name="file-document-box-plus-outline" size={35} color="#fff" />} 
                            name="Claims" 
                        />
                        <CardSquare 
                            icon={<MaterialCommunityIcons name="shield-home" size={35} color="#fff" />} 
                            name="Policies" 
                        />
                        <CardSquare 
                            icon={<AntDesign name="customerservice" size={35} color="#fff" />} 
                            name="Help" 
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
                <View style={{marginVertical: 20, paddingHorizontal: 15,}}>
                    <Text 
                        style={[styles.headerText, {color: colors.text, paddingLeft: 0, marginBottom: 15}]}
                    >
                        Recent Activities
                    </Text>
                    <Activity type="Policy" summary="Certificate for policy #12345 is now downloadable" time="1 day" />
                    <Activity type="Claims" summary="Claims recieved and is been processed" time="44m" />
                    <Activity type="Policy" summary="Certificate for policy #12345 is now downloadable" time="1 day" />
                    <Activity type="Claims" summary="Claims recieved and is been processed" time="44m" />
                </View>
            </ScrollView>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
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
                <Text style={{...styles.text, color: '#ffffff'}}>{name}</Text> 
            </View>
        </TouchableOpacity>
    )
}

export const Activity = ({type, summary, time}) => {
    return (
        <View style={styles.update}>
            <Text style={styles.updateText}>{type}</Text>
            <View style={styles.apart}>
                <Text style={[styles.updateText, {fontFamily: 'OpenSans_400Regular'}]}>{summary}</Text>
                <Text style={styles.icon}><MaterialCommunityIcons name="file-cabinet" size={24} color="#fff" /></Text>
            </View>
            <Text style={{fontFamily: 'OpenSans_400Regular'}}>{time} ago</Text>
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
    }
});