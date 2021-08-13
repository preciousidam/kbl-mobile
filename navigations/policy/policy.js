import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js';
import { useTheme } from '@react-navigation/native';
import FocusAwareStatusBar from '../../components/statusBar';
import { ActInd } from '../../components/activityIndicator';

export const Policy = props => {
    const {colors, dark} = useTheme();
    const [loading, setLoading] = useState(false);

    const onLoad = syntheticEvent => {
        const { nativeEvent } = syntheticEvent;
        setLoading(nativeEvent.loading);
    }

    return (
        <View>
            <PDFReader
                source={{
                    uri: 'https://kblinsurance.com/wp-content/uploads/2020/05/KBL-Insurance-Data-Privacy-Policy.pdf',
                }}
                onLoadStart={onLoad}
                onLoadEnd={onLoad}
            />
            <ActInd status={loading} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content'} backgroundColor={colors.card} />
        </View>
    );
}

export default Policy;