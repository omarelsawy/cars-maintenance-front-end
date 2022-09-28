import Maintenance from '../components/Maintenance';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../utils/Constant';

const Home = () => {

    const navigate = useNavigate();
    const [ cars, setCars ] = useState([]);
    const [ maintenanceArr, setMaintenanceArr ] = useState([]);

    async function fetchCars() {
        let response = await fetch(`${API_URL}/cars`,{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const carsRes = responseJson?.data?.cars;
            setCars(carsRes);
        }
        else if(status === 401){
            localStorage.removeItem("token");
            navigate('/login');
        }
        else{
            let error = responseJson?.data?.error
            error && alert(error);
        }
    }

    async function fetchMaintenance(filter) {
        let response = await fetch(`${API_URL}/maintenance?` + new URLSearchParams(filter), {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const maintenanceRes = responseJson?.data?.maintenance;
            setMaintenanceArr(maintenanceRes);
        }
        else if(status === 401){
            localStorage.removeItem("token");
            navigate('/login');
        }
        else{
            let error = responseJson?.data?.error
            error && alert(error);
        }
    }

    useEffect(() => {
        fetchCars();
        fetchMaintenance();
    }, []);

    const handleCarChange = (selected) => {
        fetchMaintenance({"carId": selected.value});
    }

    return (

        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>
                <Col>
                    <Select
                        //value={selectedOption}
                        onChange={handleCarChange}
                        options={cars.map(car=>{
                            return {'value': car._id, 'label': car.name}
                        })}
                    />
                </Col>

                <Col>
                    <Link to={'/maintenance/add'}>
                        <Button>
                            add Maintenance
                        </Button>
                    </Link>
                </Col>
                
                <Row>
                    <Col>
                        <Maintenance maintenanceArr={maintenanceArr} />
                    </Col>
                </Row>
                
            </Row>

        </>
            
    )

}

export default Home