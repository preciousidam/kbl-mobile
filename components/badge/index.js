import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Badge } from 'react-native-elements';


export const WithBadge = ({icon, count=0}) => {
    return (
        <View>
            {icon}
            {(count > 0) && <Badge value={count} status='error' containerStyle={styles.badge} />}
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        top: -6,
        right: -7,
    }
});