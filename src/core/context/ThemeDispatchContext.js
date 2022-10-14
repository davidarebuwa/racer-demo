import React from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  useTheme,
} from '@mui/material/styles';

const ThemeDispatchContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
function ThemeProvider({ children, theme }) {
  const themeInitialOptions = {
    paletteMode: 'light',
  };

  const [themeOptions, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'changeTheme':
          return {
            ...state,
            paletteMode: action.payload,
          };
        default:
          throw new Error();
      }
    },
    themeInitialOptions,
  );

  const memoizedTheme = React.useMemo(() => createTheme({
    ...theme,
    palette: {
      mode: themeOptions.paletteMode,
    },
  }), [theme, themeOptions.paletteMode]);

  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  );
}

export default ThemeProvider;

export const useChangeTheme = () => {
  const dispatch = React.useContext(ThemeDispatchContext);
  const theme = useTheme();
  const changeTheme = React.useCallback(
    () => dispatch({
      type: 'changeTheme',
      payload: theme.palette.mode === 'light' ? 'dark' : 'light',
    }),
    [theme.palette.mode, dispatch],
  );

  return changeTheme;
};
