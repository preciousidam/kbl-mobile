import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';


import Login from './screens/login';
import Register from './screens/register';
import Verify from './screens/verify-number';
import Reset from './screens/reset-password';





const Stack = createStackNavigator();

export const AuthFlow = props => {
    
    const {Screen, Navigator} = Stack;
    const {isSignOut} = useSelector( state => state.auth);


    return (
        <Navigator>  
            <Screen 
                component={Login}
                name="Login"
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={Register}
                name="Register"
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={Reset}
                name="Reset"
                options={{
                    title: 'Reset password',
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={Verify}
                name="Verify"
                options={{
                    title: 'Verify number',
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
        </Navigator>
    )
}

export default AuthFlow;