import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AddMaintenance from './pages/AddMaintenance';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {

  return (

        <Routes>
          
          <Route element={ <ProtectedRoutes /> }>
            <Route path='/' element={ <Home /> } />
            <Route path='/maintenance/add' element={ <AddMaintenance /> } />
          </Route>
          
          <Route path='/login' element={ <Login /> } />
        
        </Routes>

  );
}

export default App;
