import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { useSelector } from 'react-redux';
import SplashScreen from './splash';
//import AuthFlow from './authentication';
//import HomeNavigation from './app';
import {loadFonts} from '../styles/fonts';
import AuthFlow from './auth';
import Privacy from './policy';
import { AppNavigator } from './app';


const Stack = createStackNavigator();

export function MainNavigation(props){
  
    const {Navigator, Screen} = Stack;
    const fontLoaded = loadFonts();
    const {isRestoring, user} = useSelector(state => state.auth);
    const {terms} = useSelector(state => state.app);
    
    return(
        fontLoaded && <Navigator>
            {isRestoring && <Screen name='Splash' component={SplashScreen} options={{headerShown: false}} />}
            {terms === null &&<Screen name='Privacy' component={Privacy} options={{headerShown: false}} />}
            {user === null && <Screen name="Auth" component={AuthFlow} options={{headerShown: false}} />}
            {user !== null && <Screen name="App" component={AppNavigator} options={{headerShown: false}} />}
        </Navigator>
    )
      
}

export default MainNavigation;