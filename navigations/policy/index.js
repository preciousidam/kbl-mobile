import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Agree from './agree';
import Policy from './policy';

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
                name="Policy" 
                component={Policy}
            />
        </Navigator>
    )
}

export default PrivacyNavigator;