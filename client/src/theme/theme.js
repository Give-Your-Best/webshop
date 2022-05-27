const colors = {
  red: {
    500: '#BA1B1A',
  },
  pink: {
    100: '#db709312',
    500: '#F9D5DE',
  },
  yellow: {
    500: '#FFDE59',
  },
  white: {
    500: '#FFFFFF',
  },
  blue: {
    200: '#51C1EF',
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
    primary: colors.red[500],
    secondary: colors.pink[500],
    yellow: colors.yellow[500],
    white: colors.white[500],
    black: colors.black[500],
    blue: colors.blue[200],

    borders: colors.grey[100],
    frontPanelBackground: colors.pink[100],
  },
  mobile: '480px'
};