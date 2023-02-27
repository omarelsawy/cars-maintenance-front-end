import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Cars from './pages/Cars';
import AddMaintenance from './pages/AddMaintenance';
import AddCar from './pages/AddCar';
import ProtectedRoutes from './utils/ProtectedRoutes';
import SingleMaintenance from './pages/SingleMaintenance';
import SingleCar from './pages/SingleCar';
import Orders from './pages/Orders';
import AddOrder from './pages/AddOrder';
import SingleOrder from './pages/SingleOrder';
import Reminders from './pages/Reminders';
import AddReminder from './pages/AddReminder';
import MaintenancePage from './pages/Maintenance';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';

export const ThemeContext = React.createContext({
  mod: '',
  toggleThemeColor: () => { }
})

function App() {

  const toggleThemeColorFn = () => {
    setThemeColor((prevThemeColor) => {
      return {
        ...prevThemeColor,
        mod: prevThemeColor.mod === 'light' ? 'dark' : 'light'
      }
    })
  }

  const initThemeColor = {
    mod: "light",
    toggleThemeColor: toggleThemeColorFn
  }

  const [themeColor, setThemeColor] = useState(initThemeColor)

  const theme = createTheme({
    palette: {
      mode: themeColor.mod,
    },
  });

  return (

    <ThemeContext.Provider value={themeColor}>

      <ThemeProvider theme={theme}>

        <CssBaseline />

        <Routes>

          <Route element={<ProtectedRoutes />}>

            <Route path='/' element={<Reminders />} />
            <Route path='/maintenance' element={<MaintenancePage />} />
            <Route path='/cars' element={<Cars />} />
            <Route path='/maintenance/add' element={<AddMaintenance />} />
            <Route path='/cars/add' element={<AddCar />} />
            <Route path='/maintenance/:id' element={<SingleMaintenance />} />
            <Route path='/cars/:id' element={<SingleCar />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orders/add' element={<AddOrder />} />
            <Route path='/orders/:id' element={<SingleOrder />} />
            <Route path='/reminders' element={<Reminders />} />
            <Route path='/reminders/add' element={<AddReminder />} />

          </Route>

          <Route path='/login' element={<Login />} />

        </Routes>

      </ThemeProvider>

    </ThemeContext.Provider>

  );
}

export default App;
