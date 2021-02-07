import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Avatar } from 'react-native-elements';
import { View, TouchableOpacity, Text } from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 
import Dashboard from './Dashboard';
import { useTheme } from '@react-navigation/native';
import PolicyNavigator from '../policies';
import ClaimNavigator from '../claims';
import { PolicyListView } from '../policies/list';
import { CliamListView } from '../claims/list';
import { Help } from '../help';
import SettingNavigator from '../profile';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function HomeTabNavigation({navigation}){
    const {colors} = useTheme();
    const {Navigator, Screen} = Tab;

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            
        })
    }, [navigation])

    return (
        <Navigator
            
            tabBarOptions={{
                style: {
                    
                }
            }}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let iconType;

                    if (route.name === 'Home'){
                        
                        iconType = <Ionicon name='ios-home' size={size} color={color} />;
                    }else if (route.name === 'Coverage'){
        
                        iconType = <Ionicon name='ios-umbrella' size={size} color={color} />;
                    }
                    else if (route.name === 'Claims'){
                        iconType = <AntDesign name="form" size={size} color={color} />;
                    }
                    else if (route.name === 'Profile'){
                        iconType = (<Avatar 
                            rounded 
                            size="small" 
                            icon={{name: 'person', type: 'ionicons', color: "#fff"}} 
                             containerStyle={{backgroundColor: colors.primary, width: 25, height: 25}}
                        />);
                    }

                    else if (route.name === 'More'){
                        iconType = <Ionicon name='ios-menu' size={size} color={color} />;
                    }

                    return iconType;
                }
            })}
        >
            <Screen
                name="Home"
                component={Dashboard}
            />
            <Screen
                name="Coverage"
                component={PolicyListView}
            />
            <Screen
                name="Claims"
                component={CliamListView}
            />
            <Screen
                name="Profile"
                component={SettingNavigator}
            />
        </Navigator>
    );
}


export const MainNavigator = ({navigation}) => {
    const {colors} = useTheme();
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                name="TabNav"
                component={HomeTabNavigation}
                options={{
                    headerShown: false,
                }}
            />
            <Screen
                name="new_policy"
                component={PolicyNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Screen
                name="new_claim"
                component={ClaimNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Screen
                name="help"
                component={Help}
                options={{
                    title: "Get In Touch",
                    headerTitleStyle:{
                        fontFamily: "Montserrat_700Bold",
                        fontSize: 16,
                    }
                }}
            />
        </Navigator>
    )
}