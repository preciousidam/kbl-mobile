import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { TouchableOpacity, View } from 'react-native';
import { UpdateKYC } from './update';
import { useTheme } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';

const Stack = createStackNavigator()
export const KYCNavigation = ({navigation}) => {
    const {Navigator, Screen} = Stack;
    const {colors, dark} = useTheme();
    return (
        <Navigator>
            <Screen
                name="updateKYC"
                component={UpdateKYC}
                options={{
                    title: "KYC Form",
                    headerTitleStyle:{
                        color: '#fff',
                    },
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerLeft: ({color, size}) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <View style={{paddingLeft: 15}}>
                                    <Ionicons name="ios-menu" color="#fff" size={30}  />
                                </View>
                            </TouchableOpacity>       
                        )
                    }
                }}
            />
        </Navigator>
    );
}