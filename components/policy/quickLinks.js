import React, { useRef } from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontiso from 'react-native-vector-icons/Fontisto';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {CardSquare} from './cardSquare';
import { useSelector } from 'react-redux';

export const ProductList = ({}) => {
    const {colors} = useTheme();
    const {products} = useSelector(state => state.app);
    const ref = useRef();
    
    const data = products.map(({id,category, name, icon}) => ({id, name, category, icon: <Ionicons name={icon} color="#fff" size={35} />}))
    
    
    const {navigate} = useNavigation()
    
    const renderItems = ({item, index}) => (
        <CardSquare
            {...item}
            onPress={_ => navigate('new_policy', { screen: 'new', params:{pid: item?.id}})}
        />);

    return(
        <View style={styles.container}>
            <View style={styles.more}>
                <Text style={[styles.headerText, {color: colors.text}]}>Products</Text>
                <TouchableOpacity 
                    activeOpacity={.7} 
                    style={{flexDirection: 'row'}}
                    onPress={() => ref.current.scrollToEnd()}
                >
                    <Text style={{textAlign: 'center', textAlignVertical: 'center', color: colors.text}}>more</Text>
                    <Ionicons name="arrow-forward" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
           <FlatList
                ref={ref}
                data={data}
                keyExtractor={item => item.name}
                renderItem={renderItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16,}} />}
                contentContainerStyle={{paddingHorizontal: wp("3.5%"), paddingVertical: hp("1%")}}
            />
        </View>
    )
}

export default ProductList;


const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginVertical: hp("2%"),
        marginTop: hp("1.5%"),
    },
    more: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('3%'),
        paddingBottom: hp('1%')
    },
    headerText: {
        fontFamily: 'Montserrat_700Bold',
        paddingHorizontal: 15,
    },
});