import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {CommaFormatted} from '../utility';

export const Money = ({amount, style,...rest}) => {

    return <Text style={style}>{`${'\u20A6'} ${CommaFormatted(parseFloat(amount).toFixed(2))}`}</Text>
}

Money.propTypes = {
    amount: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    rest: PropTypes.any,
}