import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
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

function App() {

  return (

        <Routes>
          
          <Route element={ <ProtectedRoutes /> }>
            
            <Route path='/' element={ <Home /> } />
            <Route path='/cars' element={ <Cars /> } />
            <Route path='/maintenance/add' element={ <AddMaintenance /> } />
            <Route path='/cars/add' element={ <AddCar /> } />
            <Route path='/maintenance/:id' element={ <SingleMaintenance /> } />
            <Route path='/cars/:id' element={ <SingleCar /> } />
            <Route path='/orders' element={ <Orders /> }/>
            <Route path='/orders/add' element={ <AddOrder /> } />
            <Route path='/orders/:id' element={ <SingleOrder /> } />
            <Route path='/reminders' element={ <Reminders /> }/>
            <Route path='/reminders/add' element={ <AddReminder /> } />

          </Route>
          
          <Route path='/login' element={ <Login /> } />
        
        </Routes>

  );
}

export default App;
