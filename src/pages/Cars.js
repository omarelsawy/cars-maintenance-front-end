import CarsList from '../components/CarsList';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_URL_COMPANY} from '../utils/Constant';
import Paginator from '../components/Paginator';
import Loader from '../components/Loader';

const Cars = () => {

    const API_URL_COMPANY_Var = API_URL_COMPANY();

    const navigate = useNavigate();

    const [ enableLoader, setEnableLoader ] = useState(true);

    const [ carsArr, setCarsArr ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ carsCount, setCarsCount ] = useState(0);
    
    const perPage = 10;
    let pagesCount = Math.ceil(carsCount/perPage)

    async function fetchCars(filter) {
        let response = await fetch(`${API_URL_COMPANY_Var}/cars?` + new URLSearchParams(filter) ,{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

        let responseJson = await response.json();
        let status = response.status;
        
        setEnableLoader(false)

        if(status === 200){
            const carsRes = responseJson?.data?.cars;
            const carsCountRes = responseJson?.data?.count;
            setCarsArr(carsRes);
            setCarsCount(carsCountRes)
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
        let filter = {
            'page': page,
            'perPage': perPage
        }
        fetchCars(filter);
    }, [page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (

        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>
            {enableLoader && <Loader />}

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
                        
                        <>
                        <div className='mt-3'><span className='fw-bold'>cars count: {carsCount}</span></div>
                        <CarsList cars={carsArr} />
                        <Paginator pagesCount={pagesCount} handleChangePage={handleChangePage} />
                        </>
                        
                        : <div className='mt-3'>No cars right now</div>
                        }
                    </Col>
                </Row>
                
            </Row>

        </>
            
    )

}

export default Cars