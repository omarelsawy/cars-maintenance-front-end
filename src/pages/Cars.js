import CarsList from '../components/CarsList';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../utils/Constant';
import {API_URL_COMPANY} from '../utils/Constant';

const Cars = () => {

    const navigate = useNavigate();
    const [ carsArr, setCarsArr ] = useState([]);

    async function fetchCars() {
        let response = await fetch(`${API_URL_COMPANY}/cars`,{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const carsRes = responseJson?.data?.cars;
            setCarsArr(carsRes);
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

    return (

        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>

                <Col>
                    <Link to={'/cars/add'}>
                        <Button>
                            Add Car
                        </Button>
                    </Link>
                </Col>
                
                <Row>
                    <Col>
                        {carsArr.length > 0 ? 
                        <CarsList cars={carsArr} />
                        : <div className='mt-3'>No cars right now</div>
                        }
                    </Col>
                </Row>
                
            </Row>

        </>
            
    )

}

export default Cars