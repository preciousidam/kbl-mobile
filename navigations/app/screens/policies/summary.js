import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Solidbutton } from '../../../../components/button';
import { Money } from '../../../../components/money';
import FocusAwareStatusBar from '../../../../components/statusBar';


export const SummaryView = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    const {form} = useSelector(state => state.policies);
    const allProduct = useSelector(state => state.app?.products)
    const [product, setProduct] = useState();

    useEffect(() => {
        setProduct(allProduct.find(({id}) => id === form?.product))
    }, [form]);
    
    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <Header premium={form?.premium?.toFixed(2)} />
                <View style={[styles.product, {backgroundColor: colors.card}]}>
                    <Text style={[styles.pHeader, {color: colors.text}]}>Product</Text>
                    <Text style={[styles.pTitle, {color: colors.text}]}>{product?.name}</Text>
                </View>
                <View style={[styles.product, {backgroundColor: colors.card}]}>
                    <Text style={[styles.pHeader, {color: colors.text}]}>Detail Information</Text>
                    <View style={[styles.infoView]}>
                        <Text style={[styles.info1]}>Policy Number</Text>
                        <Text style={[styles.info]}>{form.policy_number}</Text>
                    </View>
                    <View style={[styles.infoView]}>
                        <Text style={[styles.info1]}>Value</Text>
                        <Money style={[styles.info]} amount={parseFloat(form.value).toFixed(2)} />
                    </View>
                    <View style={[styles.infoView]}>
                        <Text style={[styles.info1]}>Valid Till</Text>
                        {form?.valid_till && <Text style={[styles.info]}>{moment(form?.valid_till).format('lll')}</Text>}
                    </View>
                </View>
            </ScrollView>
            <View style={{padding: 15}}><Solidbutton text="Continue" onPress={e => navigate('payOpt')} /></View>
            <FocusAwareStatusBar barStyle={!dark? 'light-content': 'dark-content' } backgroundColor={colors.primary} />
        </View>
    )
}

export const Header = ({premium}) => {
    const {colors, dark} = useTheme();
    return (
        <View style={[styles.header, {backgroundColor: colors.primary}]}>
            <Text style={[styles.headerT1]}>Premium Payable</Text>
            <Money amount={premium} style={[styles.headerT2]} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 15,
    },
    headerT1: {
        fontFamily: 'Montserrat_700Bold',
        color: '#fff',
        paddingVertical: 5,
    },
    headerT2: {
        fontFamily: 'Montserrat_700Bold',
        color: '#fff',
        paddingVertical: 5,
        fontSize: 20,
    },
    product: {
        margin: 10,
        elevation: 2,
        shadowOpacity: .2,
        padding: 10,
        borderRadius: 5,
    },
    pHeader:{
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 5,
    },
    pTitle:{
        fontFamily: 'OpenSans_400Regular',
    },
    infoView: {
        marginVertical: 10,
    },
    info1: {
        fontFamily: 'OpenSans_700Bold',
    },
    info: {
        fontFamily: 'OpenSans_400Regular',
    }
})