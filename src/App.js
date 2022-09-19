import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {

  return (

        <Routes>
          
          <Route element={ <ProtectedRoutes /> }>
            <Route path='/home' element={ <Home /> } />
            <Route path='/' element={ <Home /> } />
          </Route>
          
          <Route path='/login' element={ <Login /> } />
        
        </Routes>

  );
}

export default App;
