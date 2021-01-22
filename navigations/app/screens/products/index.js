import React from 'react';
import {View, Text} from 'react-native';


export const ProductList = ({}) => {

    return (
        <View>
        </View>
    )
}

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