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
import {API_URL_COMPANY} from '../utils/Constant';
import Paginator from '../components/Paginator';

const Home = () => {

    const navigate = useNavigate();
    const [ cars, setCars ] = useState([]);
    const [ maintenanceArr, setMaintenanceArr ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ maintenanceCount, setMaintenanceCount ] = useState(0);
    const [ carSelected, setCarSelected ] = useState();

    const perPage = 10;
    let pagesCount = Math.ceil(maintenanceCount/perPage)

    async function fetchCars() {
        let response = await fetch(`${API_URL_COMPANY}/cars`,{
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
        let response = await fetch(`${API_URL_COMPANY}/maintenance?` + new URLSearchParams(filter), {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const maintenanceRes = responseJson?.data?.maintenance;
            const maintenanceCountRes = responseJson?.data?.count;
            setMaintenanceArr(maintenanceRes);
            setMaintenanceCount(maintenanceCountRes)
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
    }, []);

    useEffect(() => {
        let filter = {
            'page': page,
            'perPage': perPage
        }

        if(carSelected){
            filter.carId = carSelected.value
        }

        fetchMaintenance(filter);
    }, [page, carSelected]);

    const handleCarChange = (selected) => {
        setCarSelected(selected)
    }

    const handlePrev = () => {
        if(page > 1){
            setPage(prevPage => prevPage-1);
        }
    }

    const handleNext = () => {
        if(page < pagesCount){
            setPage(prevPage => prevPage+1)
        }
    }

    return (

        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>
                <Col>
                    <Select
                        onChange={handleCarChange}
                        options={cars?.map(car=>{
                            return {'value': car._id, 'label': car.name}
                        })}
                        value = {carSelected}
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
                        {maintenanceArr.length > 0 ? 
                            <>
                            <Maintenance maintenanceArr={maintenanceArr} />
                            <Paginator page={page} handlePrev={handlePrev} handleNext={handleNext} />
                            </>
                            : <div className='mt-3'>No maintenance right now</div>
                        }
                    </Col>
                </Row>
                
            </Row>

        </>
            
    )

}

export default Home