import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchInput } from '../../../../components/input';
import FocusAwareStatusBar from '../../../../components/statusBar';

const Stack = createStackNavigator();

export const BranchesRoute = ({}) => {
    const {Navigator, Screen} = Stack;

    return (
        <Navigator>
            <Screen
                component={Branches}
                name="branches"
                options={{
                    title: 'Branches',
                    headerTitleStyle: {
                        fontSize: 18,
                    }
                }}
            />
        </Navigator>
    )
}

export const Branches = ({}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                initialRegion={{
                    latitude: 6.45407,
                    longitude: 3.39467,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            <View style={[styles.bottom, {backgroundColor: colors.card}]}>
                <Text>Bottom Part</Text>
            </View>
            <Header />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

export const Header = ({}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={[styles.header, {backgroundColor: colors.card}]}>

            <SearchInput 
                placeholder="Search branches by location"
                style={styles.search}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    bottom: {
        minHeight: 100,
        width: Dimensions.get('window').width,
        elevation: 2,
        shadowOpacity: .5,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        padding: 15,
        position: 'absolute',
        bottom: 0,
    },
    header: {
        position: 'absolute',
        top: 0,
        width: Dimensions.get('window').width,
        padding: 15,
        zIndex: 10,
    },
    search: {
        paddingVertical: 5,
    }
});