import customColors from './custom-theme';

const secondary = '#004fb4';
const secondaryDark = '#004fb4';
const primaryLight = '#FF9D14';
const primary = '#F5AF19'
const primaryTint = '#F8C964';
const textDarkBg = '#ffffff';
const textLightBg = '#232B28';
const highlight = '#8d8d8d';
const seperator = '#1d1d1d';
const bgHighlight = 'rgba(245, 175, 25, .2)';
const card = '#1D263B';

export const dark = {
    primary,
    primaryTint,
    secondary,
    secondaryDark,
    card,
    text: textDarkBg,
    twitter: '#00acee',
    google: '#DB4437',
    facebook: '#4267B2',
    primaryLight,
    highlight,
    bgHighlight,
    seperator,
    ...customColors
};

export const light = {
    primary,
    primaryTint,
    secondary,
    secondaryDark,
    text: textLightBg,
    twitter: '#00acee',
    google: '#DB4437',
    facebook: '#4267B2',
    primaryLight,
    highlight,
    bgHighlight,
    seperator,
    ...customColors
};