import OrdersList from '../components/OrdersList';
import NavBar from '../components/NavBar';
import { Col, Button, InputGroup, Row, Form } from "react-bootstrap";
import SideBar from '../components/SideBar';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../utils/Constant';
import {API_URL_COMPANY} from '../utils/Constant';
import Paginator from '../components/Paginator';
import { FaSearch } from 'react-icons/fa';

const Orders = () => {

    const API_URL_COMPANY_Var = API_URL_COMPANY();
    const navigate = useNavigate();
    const [ cars, setCars ] = useState([]);
    const [ ordersArr, setOrdersArr ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ ordersCount, setOrdersCount ] = useState(0);
    const [ carSelected, setCarSelected ] = useState();
    const [ formData, setFormData ] = useState({
        start: "", end: ""
    });

    const perPage = 10;
    let pagesCount = Math.ceil(ordersCount/perPage)

    async function fetchCars() {
        let response = await fetch(`${API_URL_COMPANY_Var}/cars`,{
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

    async function fetchOrders(filter) {
        let response = await fetch(`${API_URL_COMPANY_Var}/orders?` + new URLSearchParams(filter), {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const ordersRes = responseJson?.data?.orders;
            const ordersCountRes = responseJson?.data?.count;
            setOrdersArr(ordersRes);
            setOrdersCount(ordersCountRes)
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
            ...formData,
            'page': page,
            'perPage': perPage
        }

        if(carSelected){
            filter.carId = carSelected.value
        }

        fetchOrders(filter);
    }, [page, carSelected, formData]);

    const handleCarChange = (selected) => {
        setCarSelected(selected)
    }

    const handleChange = (event) => {

        const { name, value } = event.target

        setFormData(prevFormDate => {
            return { 
                ...prevFormDate,
                [name]: value
            };
        })

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

                <Row>
                    <Col>
                        <Link to={'/orders/add'}>
                            <Button>
                                Add Order
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <Row className='mt-3'>

                    <Col>
                        <Select
                            onChange={handleCarChange}
                            isClearable={true}
                            options={cars?.map(car=>{
                                return {'value': car._id, 'label': car.name}
                            })}
                            value = {carSelected}
                        />
                    </Col>

                    <Col>
                        <InputGroup>
                            <InputGroup.Text id="from-date">
                                <FaSearch/>
                                FromDate
                            </InputGroup.Text>
                            <Form.Control type="date" name='start' onChange={handleChange} value={formData.start} aria-describedby="from-date" />
                        </InputGroup>
                    </Col>

                    <Col>
                        <InputGroup>
                            <InputGroup.Text id="to-date">
                                <FaSearch/>
                                ToDate
                            </InputGroup.Text>
                            <Form.Control type="date" name='end' onChange={handleChange} value={formData.end} aria-describedby="from-date" />
                        </InputGroup>
                    </Col>
                </Row>        

                <Row>
                    
                    <Col>
                        {ordersArr.length > 0 ? 
                            <>
                            <div className='mt-3'><span className='fw-bold'>orders count: {ordersCount}</span></div>
                            <OrdersList orders={ordersArr} />
                            <Paginator page={page} handlePrev={handlePrev} handleNext={handleNext} />
                            </>
                            : <div className='mt-3'>No orders right now</div>
                        }
                    </Col>
                </Row>

            </Row>
        </>
    )
}

export default Orders