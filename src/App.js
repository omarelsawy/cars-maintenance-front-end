import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Cars from './pages/Cars';
import AddMaintenance from './pages/AddMaintenance';
import AddCar from './pages/AddCar';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {

  return (

        <Routes>
          
          <Route element={ <ProtectedRoutes /> }>
            <Route path='/' element={ <Home /> } />
            <Route path='/cars' element={ <Cars /> } />
            <Route path='/maintenance/add' element={ <AddMaintenance /> } />
            <Route path='/cars/add' element={ <AddCar /> } />
          </Route>
          
          <Route path='/login' element={ <Login /> } />
        
        </Routes>

  );
}

export default App;
