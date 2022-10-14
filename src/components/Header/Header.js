import React, { useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import classNames from 'classnames';
import Sidebar from '../Sidebar/Sidebar';

// styles
import useStyles from './styles';
import './style.css';

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../core/context/LayoutContext';

// eslint-disable-next-line react/prop-types
function Header({ onToggleDarkMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const location = useMemo(
    () => ({
      pathname: window.location.pathname,
    }),
    [],
  );

  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            onClick={() => toggleSidebar(layoutDispatch)}
            className={classNames(
              classes.headerMenuButtonSandwich,
              classes.headerMenuButtonCollapse,
            )}
          >
            {layoutState.isSidebarOpened ? (
              <ArrowBackIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
          </IconButton>
          <Typography variant="h6" weight="medium" className={classes.logotype}>
            F1 Dashboard 2022
          </Typography>
          <div id="header-right">
            <IconButton
              sx={{ height: '40px', width: '40px', mr: 2 }}
              onClick={onToggleDarkMode}
              color="default"
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness4 />
              ) : (
                <Brightness7 />
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Sidebar location={location} />
    </div>
  );
}

export default Header;
