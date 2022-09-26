import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';
import {API_URL} from '../utils/Constant';

const AddMaintenance = () => {

    const handleAddMaintenance = () => {
        fetch(`${API_URL}/maintenance`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "carId": '632c3cc27c0569d3871b37bf'
            })
        });
    }

    return (
        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>
                add maintenance
            </Row>

        </>
    )

}

export default AddMaintenance;