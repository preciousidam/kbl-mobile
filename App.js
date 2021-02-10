import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {Provider} from 'react-redux';
import FlashMessage from "react-native-flash-message";
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

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

const prefix = Linking.createURL('/');

export default function App() {
	const scheme = useColorScheme();
	const linking = {
		prefixes: [prefix, 'https://kblinsuranceng.com', 'exps://kblinsuranceng.com'],
		config: {
			// Configuration for linking
			screens: {
				App: {
					screen: {
						Home: {
							screen: {
								TabNav: {
									Coverage: 'policy/:pn',
								}
							}
						},
						Notifications: {
							screen: {
								Notifications: {
									screen: {
										Read: 'notification/:id'
									}
								}
							}
						}
					}
				}
			}
		},
        subscribe(listener) {
			const onReceiveURL = ({ url }) => listener(url);

			// Listen to incoming links from deep linking
			Linking.addEventListener('url', onReceiveURL);

			// Listen to expo push notifications
			const subscription = Notifications.addNotificationResponseReceivedListener(response => {
			
				const url = response.notification.request.content.data.url;

				// Any custom logic to see whether the URL needs to be handled
				//...

				// Let React Navigation handle the URL
				listener(url);
			});

			return () => {
				// Clean up the event listeners
				Linking.removeEventListener('url', onReceiveURL);
				subscription.remove();
			};
        },
	}

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
		
	};

  return (
    <Provider store={store}>
		<AppearanceProvider>
			<ActionSheetProvider>
			<SafeAreaProvider>
				<NavigationContainer theme={theme} linking={linking}>
					<MainNavigation />
				</NavigationContainer>
			</SafeAreaProvider>
			</ActionSheetProvider>
		</AppearanceProvider>
		<FlashMessage position="top" />
    </Provider>
  )
}