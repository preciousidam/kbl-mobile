import React from 'react';
import {View, FlatList, StyleSheet,} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontiso from 'react-native-vector-icons/Fontisto';

import {CardSquare} from './cardSquare';
import { useSelector } from 'react-redux';

export const ProductList = ({}) => {
    const {colors} = useTheme();
    const {products} = useSelector(state => state.app);
    
    const data = products.map(({id,category, name, icon}) => ({id, name, category, icon: <Ionicons name={icon} color="#fff" size={35} />}))
    
    
    const {navigate} = useNavigation()
    
    const renderItems = ({item, index}) => (
        <CardSquare
            {...item}
            onPress={_ => navigate('new_policy', { screen: 'new', params:{pid: item?.id}})}
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