const colors = {
  red: {
    500: '#BA191A',
    600: '#A21010'
  },
  pink: {
    0: '#FFFBFC',
    100: '#db709312',
    500: '#FAD6DF',
  },
  blush: {
    100: '#EF7C98',
  },
  yellow: {
    500: '#FAD22A',
  },
  white: {
    500: '#FFFFFF',
  },
  blue: {
    200: '#7ed4f7',
  },
  black: {
    400: '#454545',
    500: '#000000',
  },
  grey: {
    100: '#f0f0f0',
  },
};

export const theme = {
  texts: {
    primary: colors.black[400],
  },
  fontSizes: {
    extraSmall: 12,
    small: 14,
    normal: 16,
    medium: 18,
    large: 20,
  },
  colorMappings: {
    background: colors.pink[0],
    primary: colors.red[500],
    secondary: colors.pink[500],
    yellow: colors.yellow[500],
    blush: colors.blush[100],
    lightPink: colors.pink[100],
    white: colors.white[500],
    black: colors.black[500],
    blue: colors.blue[200],

    borders: colors.red[500],
    buttonBorders: colors.red[600],
    frontPanelBackground: colors.pink[100],
  },
  mobile: '768px',
  mid: '65rem'
};