import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {Provider} from 'react-redux';
import FlashMessage from "react-native-flash-message";

import {dark,light} from './styles/theme';
import {store} from './store';
import MainNavigation from './navigations';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const scheme = useColorScheme();

  const rntheme = scheme === 'dark' ? DarkTheme: DefaultTheme ;
  const colors = scheme === 'dark' ? dark: light ;
  const theme = {
    ...rntheme,
    colors: {
      ...rntheme.colors,
      ...colors,
    }
  }
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