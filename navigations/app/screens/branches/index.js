import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchInput } from '../../../../components/input';
import FocusAwareStatusBar from '../../../../components/statusBar';
import SwipeablePanel from 'react-native-sheets-bottom';
import { useDispatch, useSelector } from 'react-redux';
import { Linking } from 'react-native';
import { retrieveBranchAsync } from '../../../../store/reducers/app';
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export const BranchesRoute = ({navigation}) => {
    const {Navigator, Screen} = Stack;
    const {colors, dark} = useTheme();

    return (
        <Navigator>
            <Screen
                component={Branches}
                name="branches"
                options={{
                    title: 'Branches',
                    headerTitleStyle: {
                        fontSize: 18,
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity onPress={_ => navigation.toggleDrawer()}>
                                <View style={{marginHorizontal: 15,}}>
                                    <Ionicons name='ios-menu' size={30} color={colors.text} />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        </Navigator>
    )
}

export const Branches = ({}) => {
    const {colors, dark} = useTheme();
    const [activePanel, setActivePanel] = useState(false);
    const {branchs} = useSelector(state => state.app);
    const dispatch = useDispatch();
    const [filtered, setFiltered] = useState('');
    const [search, setSearch] = useState('');

    const openPanel = () => setActivePanel(true);
    
    const closePanel = () => setActivePanel(false);

    useEffect(() => {
        dispatch(retrieveBranchAsync());
        openPanel();
    }, []);

    useEffect(() => {
        if (search === '') setFiltered(undefined)
        else {
            setFiltered(branchs.filter(({region}) => region.toLowerCase() == search.toLowerCase()))
        }
    }, [search])

    return (
        <View style={[styles.container, {backgroundColor: dark? colors.background: colors.card}]}>
            <Header value={search} onChange={text => setSearch(text)} />
            {/*<MapView 
                style={styles.map}
                showsUserLocation={true}
                initialRegion={{
                    latitude: 6.45407,
                    longitude: 3.39467,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />*/}
            
            <View style={{width: '100%'}}>
                <ScrollView>
                    <PanelContent branchs={filtered||branchs} />
               </ScrollView>
            </View>
            
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

export const PanelContent = ({branchs}) => {
    const {colors, dark} = useTheme()
    return (
        <View style={[styles.bottom, {color: colors.background}]}>
            {branchs.map(({region, address, tel_one, tel_two},i) => (
                <View style={{backgroundColor: dark? colors.background: colors.card}} key={region+i}>
                    <Text style={[styles.region, {color: colors.text}]}>{region.toUpperCase()} BRANCH</Text>
                    <View style={styles.shared}>
                        <View style={styles.fst}><Ionicons name="location-sharp" size={24} color={colors.success} /></View>
                        <View style={styles.snd}>
                            <Text style={[styles.text, {color: colors.text}]}>{address}</Text>
                        </View>
                    </View>
                    <View style={styles.shared}>
                        <View style={styles.fst}><Foundation name="telephone" size={24} color={colors.success} /></View>
                        <View style={styles.snd}>
                            <Text onPress={_ => Linking.openURL(`tel:${tel_one}`)} style={[styles.text, {marginRight: 15, color: colors.text}]}>{tel_one}</Text>
                            {tel_two && <Text onPress={_ => Linking.openURL(`tel:${tel_two}`)} style={[styles.text]}>{tel_two}</Text>}
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}



export const Header = ({value, onChange}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={[styles.header, {backgroundColor: colors.card}]}>

            <SearchInput 
                placeholder="Search e.g (Aba or Abuja, Owerri)"
                style={styles.search}
                value={value}
                onChangeText={onChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 45,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    bottom: {
        padding: 15,
    },
    header: {
        
        width: Dimensions.get('window').width,
        padding: 15,
        margin: 0,
       
    },
    search: {
        paddingVertical: 5,
    },
    shared:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    fst: {
        flex: 1,
    },
    snd: {
        flex: 7,
        flexDirection: 'row'
    },
    text: {
        fontFamily: 'OpenSans_400Regular',
        color: '#000'
    },
    region: {
        fontFamily: 'Montserrat_700Bold',
        color: '#000',
        fontSize: 15,
        marginBottom: 15,
    }
});