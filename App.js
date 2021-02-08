import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {Provider} from 'react-redux';
import FlashMessage from "react-native-flash-message";
import * as Notifications from 'expo-notifications'

import {dark,light} from './styles/theme';
import {store} from './store';
import MainNavigation from './navigations';
import { StyleSheet, Text, View } from 'react-native';
import { registerForPushNotificationsAsync } from './notification';
import AsyncStorage from '@react-native-community/async-storage';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export default function App() {
	const scheme = useColorScheme();

	const [notification, setNotification] = useState({});

	const rntheme = scheme === 'dark' ? DarkTheme: DefaultTheme ;
	const colors = scheme === 'dark' ? dark: light ;
	const theme = {
		...rntheme,
		colors: {
		...rntheme.colors,
		...colors,
		}
	}
	const registerNotification = async _ => {
		const token = await registerForPushNotificationsAsync();
		console.log(token)
		if (token) AsyncStorage.setItem('pushToken', token);
	}
	useEffect(() => {
		registerNotification();
	}, [])

	useEffect(() => {
		
		const subscription = Notifications.addNotificationReceivedListener(_handleNotification);
		
		return () => subscription.remove();
	},[])

	useEffect(() => {
		
		const subscription = Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
		
		return () => subscription.remove();
	}, [])

	const _handleNotification = notification => {
		setNotification(notification);
	};
	
	const _handleNotificationResponse = response => {
		console.log(response);
	};

  return (
    <Provider store={store}>
		<AppearanceProvider>
			<ActionSheetProvider>
			<SafeAreaProvider>
				<NavigationContainer theme={theme}>
					<MainNavigation />
				</NavigationContainer>
			</SafeAreaProvider>
			</ActionSheetProvider>
		</AppearanceProvider>
		<FlashMessage position="top" />
    </Provider>
  )
}