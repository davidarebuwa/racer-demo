import React, { useMemo, useState } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  useMediaQuery,
  CssBaseline,
} from '@mui/material';
import Header from './components/Header/Header';
import { LayoutProvider } from './core/context/LayoutContext';
import './App.css';

import Dashboard from './pages/dashboard/Dashboard';
import Drivers from './pages/drivers/Drivers';
import DriversList from './pages/drivers/DriversList';
import Constructors from './pages/constructors/Constructors';
import ConstructorList from './pages/constructors/ConstructorsList';
import Circuits from './pages/circuits/Circuits';
import CircuitsList from './pages/circuits/CircuitsList';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const myTheme = useMemo(
    () => createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    }),
    [darkMode],
  );

  const onToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="App">
      <LayoutProvider>
        <CssBaseline />
        <ThemeProvider theme={myTheme}>
          <BrowserRouter>
            <Header onToggleDarkMode={onToggleDarkMode} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/drivers" element={<DriversList />} />
              <Route path="/drivers/:id" element={<Drivers />} />
              <Route path="/constructors" element={<ConstructorList />} />
              <Route path="/constructors/:id" element={<Constructors />} />
              <Route path="/circuits" element={<CircuitsList />} />
              <Route path="/circuits/:id" element={<Circuits />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </LayoutProvider>
    </div>
  );
}

export default App;
