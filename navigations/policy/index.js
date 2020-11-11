import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Agree from './agree';
import Policy from './policy';
import Terms from './terms';

const Stack = createStackNavigator();

export const PrivacyNavigator = props => {

    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                name="Agree" 
                component={Agree}
                options={{headerShown: false}}
            />
            <Screen 
                name="Terms" 
                component={Terms}
            />
            <Screen 
                name="Policy" 
                component={Policy}
            />
        </Navigator>
    )
}

export default PrivacyNavigator;