import { useTheme } from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking, Modal, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import FocusAwareStatusBar from '../../../../components/statusBar';
import * as IntentLauncher from 'expo-intent-launcher';
import { PasswordOutlinedInputWithIcon } from '../../../../components/input';
import { Image } from 'react-native';
import { changePassword, logout } from '../../../../store/reducers/auth';
import { Solidbutton } from '../../../../components/button';
import { ProfileImageUploader } from '../../../../components/imageUploader/profile';
import { ActInd } from '../../../../components/activityIndicator';




const Stack = createStackNavigator();

export default function SettingNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={Profile}
                name="Setting"
                options={{
                    title: 'Profile'
                }}
            />
            
        </Navigator>
    )
}

const OpenSettingsButton = ({ children }) => {
    const {colors, dark} = useTheme();
    const handlePress = useCallback(async () => {
        // Open the custom settings if the app has one
        await Linking.openSettings();
    }, []);
  
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.action, {backgroundColor: colors.card}]}>
                <Text style={[styles.actText, {color: colors.text}]}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const OpenNotificationSettingsButton = ({ children }) => {
    const {colors, dark} = useTheme();
    const handlePress = useCallback(async () => {
        // Open the custom settings if the app has one
        await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APP_NOTIFICATION_SETTINGS);
    }, []);
  
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.action, {backgroundColor: colors.card}]}>
                <Text style={[styles.actText, {color: colors.text}]}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const ResetPasswordButton = ({ children }) => {
    const [visible, setVisible] = useState(false)
    const handlePress = () => setVisible(true);
    const {colors, dark} = useTheme();
    const [new_password1, setPass1] = useState('');
    const [new_password2, setPass2] = useState('');
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.auth);
    const change = async () => {
        dispatch(changePassword({new_password1, new_password2}));
    }
  
    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <View style={[styles.action, {backgroundColor: colors.card}]}>
                    <Text style={[styles.actText, {color: colors.text}]}>{children}</Text>
                </View>
            </TouchableOpacity>
            <Modal
                visible={visible}
                transparent={false}
                onRequestClose={_ => setVisible(false)}
            >
                <View style={[styles.modal, {backgroundColor: colors.card}]}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../../../../assets/key.png')} style={{width: 100, height: 100}} />
                        <Text style={[styles.modalText, {color: colors.text}]}>Enter new password. Password must include numbers and one special character</Text>
                        {isLoading && <ActivityIndicator color={colors.info} size="large" />}
                    </View>
                    <PasswordOutlinedInputWithIcon
                        icon={<MaterialIcons name="lock-outline" color={colors.primary} size={24} />}
                        contProps={styles.textInput}
                        placeholder="New Password"
                        value={new_password1} 
                        onChangeText={({nativeEvent}) => setPass1(nativeEvent.text)}
                        style={styles.textInput} 
                    />
                    <PasswordOutlinedInputWithIcon
                        icon={<MaterialIcons name="lock-outline" color={colors.primary} size={24} />}
                        contProps={styles.textInput}
                        placeholder="Confirm New Password"
                        value={new_password2} 
                        onChangeText={({nativeEvent}) => setPass2(nativeEvent.text)}
                        style={styles.textInput} 
                    />
                    <Solidbutton text="Change" style={{marginVertical: 20,}} onPress={change} />
                </View>
            </Modal>
        </View>
    );
};

export const Profile = ({navigation}) => {
    const {user, isLoading} = useSelector(state => state.auth);
    const {colors, dark} = useTheme();
    const dispatch = useDispatch();
    const signOut = _ => {
        dispatch(logout());
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, {backgroundColor: colors.card}]}>
                <ProfileImageUploader />
                <View>
                    <Text style={[styles.text, {color: colors.text}]}>{`${user?.first_name} ${user?.last_name}`}</Text>
                    <Text style={[styles.text, {color: colors.text}]}>{user?.email}</Text>
                </View>
            </View>
            <View style={{marginVertical: 15,}}>
                
                <ResetPasswordButton>Change Password</ResetPasswordButton>
            
                <TouchableOpacity onPress={_ => navigation.navigate("help")}>
                    <View style={[styles.action, {backgroundColor: colors.card}]}>
                        <Text style={[styles.actText, {color: colors.text}]}>Support</Text>
                    </View>
                </TouchableOpacity>
                <OpenNotificationSettingsButton>Notification</OpenNotificationSettingsButton>
                <OpenSettingsButton>Settings</OpenSettingsButton>
                <TouchableOpacity onPress={signOut}>
                    <View style={[styles.action, {backgroundColor: colors.card}]}>
                        <Text style={[styles.actText, {color: colors.text}]}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ActInd status={isLoading} />
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
        padding: 20,
        borderBottomWidth: 1,
    },
    actText: {
        fontFamily: 'OpenSans_700Bold',
    },
    textInput: {
        marginVertical: 15,
    },
    modal: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalText: {
        fontFamily: "Montserrat_400Regular",
        textAlign: 'center',
        marginVertical:20
    }
})

