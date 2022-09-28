import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';
import {API_URL} from '../utils/Constant';

const AddCar = () => {

    return (
        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>
                add car
            </Row>

        </>
    )

}

export default AddCar;