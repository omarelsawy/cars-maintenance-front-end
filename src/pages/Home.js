import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    useEffect(() => {

        if(!token){
            navigate('/login');
        }

    });

    return (
        <Container>
            Home
        </Container>
    )

}

export default Home