import React from 'react';
import {View, FlatList, StyleSheet,} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontiso from 'react-native-vector-icons/Fontisto';

import {CardSquare} from './cardSquare';

export const ProductList = ({}) => {
    const {colors} = useTheme();
    const data = [
        {icon: <Ionicons name='ios-car' color="#fff" size={35} />, name: 'Motor Third Party' },
        {icon: <Ionicons name='md-car' color="#fff" size={35} />, name: 'Motor Comp' },
        {icon: <Ionicons name='ios-home' color="#fff" size={35} />, name: 'Home' },
    ]
    
    const {navigate} = useNavigation()
    
    const renderItems = ({item, index}) => (
        <CardSquare
            {...item}
            onPress={_ => navigate('new_policy', { screen: 'new', params:{id: index}})}
        />);

    return(
        <View style={styles.container}>
           <FlatList 
                data={data}
                keyExtractor={item => item.name}
                renderItem={renderItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16,}} />}
                contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
            />
        </View>
    )
}

export default ProductList;


const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginVertical: 20,
        marginTop: 10,
    },
});