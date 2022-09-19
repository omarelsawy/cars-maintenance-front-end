import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    useEffect(() => {

        if(!token){
            navigate('/login');
        }

    });

    return (
        <Outlet />
    )
}

export default ProtectedRoutes;