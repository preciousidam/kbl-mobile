import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar } from 'react-native-elements';
import { View, TouchableOpacity, Text } from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 
import Dashboard from './Dashboard';
import { useTheme } from '@react-navigation/native';
import PolicyNavigator from '../policies';
import ClaimNavigator from '../claims';



const Tab = createBottomTabNavigator();

export function HomeNavigation({navigation}){
    const {colors} = useTheme();
    const {Navigator, Screen} = Tab;

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
                component={PolicyNavigator}
            />
            <Screen
                name="Claims"
                component={ClaimNavigator}
            />
            <Screen
                name="Profile"
                component={ClaimNavigator}
            />
            <Screen
                name="More"
                component={ClaimNavigator}
            />
        </Navigator>
    );
}
