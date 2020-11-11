import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import {OpenSans_400Regular, OpenSans_700Bold} from '@expo-google-fonts/open-sans';


export function loadFonts(){
    const [fontLoaded] = useFonts({
        Montserrat_400Regular,
        OpenSans_700Bold,
        OpenSans_400Regular,
        Montserrat_700Bold,
    })

    return fontLoaded;
}