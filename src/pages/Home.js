import Container from 'react-bootstrap/Container';
import Maintenance from '../components/Maintenance';
import NavBar from '../components/NavBar';

const Home = () => {

    return (
        <Container>
            <NavBar />
            <Maintenance />
        </Container>
    )

}

export default Home