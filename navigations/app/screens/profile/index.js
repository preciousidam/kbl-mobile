import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import FocusAwareStatusBar from '../../../../components/statusBar';





const Stack = createStackNavigator();

export default function SettingNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={Profile}
                name="Setting"
                options={{
                    title: 'Settings'
                }}
            />
            
        </Navigator>
    )
}

export const Profile = () => {
    const {user} = useSelector(state => state.auth);
    const {colors, dark} = useTheme();
    return (
        <View style={styles.container}>
            <View style={[styles.header, {backgroundColor: colors.card}]}>
                <Avatar icon={{name:"person"}} size="medium" rounded containerStyle={{backgroundColor: '#c6c6c6', marginRight: 12,}} />
                <View>
                    <Text style={styles.text}>{`${user?.first_name} ${user?.last_name}`}</Text>
                    <Text style={styles.text}>{user?.email}</Text>
                </View>
            </View>
            <View style={{marginVertical: 15,}}>
                <TouchableOpacity>
                    <View style={styles.action}>
                        <Text style={styles.actText}>Notifications</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.action}>
                        <Text style={styles.actText}>Request password change</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.action}>
                        <Text style={styles.actText}>Support</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.action}>
                        <Text style={styles.actText}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        padding: 15,
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    text: {
        fontFamily: 'Montserrat_700Bold'
    },
    action: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
    },
    actText: {
        fontFamily: 'OpenSans_700Bold',
    }
})