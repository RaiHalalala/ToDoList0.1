import React, { FC } from 'react';
import { ThemeProvider, Global, css, useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Mode, AppState } from 'reducers/appSlice';
import { RootState } from 'store';
import { colorsLight, colorsDark } from './data';

declare module '@emotion/react' {
  export interface Theme {
    colors: { [key: string]: string };
    fonts: { [key: string]: string };
    indents: { [key: string]: string };
    breakpoints: { [key: string]: string };
    shadows: { [key: string]: string };
  }
}

const theme = (colors: { [key: string]: string }) => ({
  colors: {
    primary: '#ef6464',
    accent: '#a52a2a',
    light: '#9b9b9b',
    ...colors,
  },
  fonts: {
    xs: '12px',
    s: '14px',
    m: '16px',
    l: '18px',
    xl: '20px',
    xxl: '22px',
  },
  indents: {
    xxs: '8px',
    xs: '10px',
    s: '12px',
    m: '14px',
    l: '16px',
    xl: '18px',
    xxl: '20px',
  },
  breakpoints: {
    xs: 'max-width: 576px',
    s: 'max-width: 768px',
    m: 'max-width: 992px',
    l: 'max-width: 1200px',
    xl: 'max-width: 1400px',
  },
  shadows: {
    dark: '0px 0px 28px 1px rgb(116 122 127 / 28%)',
  },
});

const GlobalStyles = () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        * {
          color: ${theme.colors.light};
        }
        h1,
        h2,
        h3,
        h4,
        h5 {
          color: ${theme.colors.text};
        }
      `}
    />
  );
};

interface WrapperEmotionProps {
  children: React.ReactNode;
}

const WrapperEmotion: FC<WrapperEmotionProps> = ({
  children,
}: WrapperEmotionProps) => {
  const { mode } = useSelector<RootState, AppState>(({ app }) => app);
  const setColors = (mode: Mode) => {
    if (mode === 'light') {
      return colorsLight;
    }
    return colorsDark;
  };
  return (
    <ThemeProvider theme={theme(setColors(mode))}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default WrapperEmotion;
