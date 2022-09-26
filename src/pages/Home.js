import Maintenance from '../components/Maintenance';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';

const Home = () => {

    return (

        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>
                <Maintenance />
            </Row>

        </>
            
    )

}

export default Home