import { useEffect, useState } from "react";
import { Card, InputGroup, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import {API_URL} from '../utils/Constant';
import {API_URL_COMPANY} from '../utils/Constant';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';
import Paginator from '../components/Paginator';

const SingleCar = () => {

    const API_URL_COMPANY_Var = API_URL_COMPANY();

    const params = useParams();
    const navigate = useNavigate();

    const [ car, setCar ] = useState({});
    const [ maintenanceCount, setMaintenanceCount ] = useState(0);
    const [ formData, setFormData ] = useState({
        dateFrom: "", dateTo: ""
    });
    const [ page, setPage ] = useState(1);

    const perPage = 10;
    let pagesCount = Math.ceil(maintenanceCount/perPage)

    async function fetchCar(filter) {
        let response = await fetch(`${API_URL_COMPANY_Var}/cars/${params.id}?` + new URLSearchParams(filter),{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const carRes = responseJson?.data?.car;
            const maintenanceCountRes = responseJson?.data?.maintenanceCount;
            setCar(carRes);
            setMaintenanceCount(maintenanceCountRes);
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
        fetchCar({
            ...formData,
            'page': page,
            'perPage': perPage
        });
    }, [formData, page]);

    const handleDetails = (id) => {
        navigate(`/maintenance/${id}`);
    }

    const handleDateChange = (e) => {
        const { name, value } = e.target
        
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

            <Row className="p-0">
                <Col>
                    <Link to={`/maintenance/add?carId=${car._id}&label=${car.name}`}>
                        <Button>
                            add Maintenance
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="p-0">
                <Col lg>
                    <Card className='mb-3 mt-3'>
                    <Card.Body>
                        <Card.Title className="text-uppercase">{ car.name }</Card.Title>
                        <Card.Text>
                            Type: {car.type}
                        </Card.Text>
                        <Card.Text>
                            Sub Type: {car.subType}
                        </Card.Text>
                        <Card.Text>
                            Color: {car.color}
                        </Card.Text>
                        <Card.Text>
                            Model: {car.model}
                        </Card.Text>
                        <Card.Text>
                            Number Plate: {car.numberPlate}
                        </Card.Text>
                        
                    </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="p-0">
                <Col>
                    <InputGroup>
                        <InputGroup.Text id="from-date">
                            <FaSearch/>
                            FromDate
                        </InputGroup.Text>
                        <Form.Control type="date" name='dateFrom' onChange={handleDateChange} value={formData.dateFrom} aria-describedby="from-date" />
                    </InputGroup>
                </Col>

                <Col className='ms-2'>
                    <InputGroup>
                        <InputGroup.Text id="to-date">
                            <FaSearch/>
                            ToDate
                        </InputGroup.Text>
                        <Form.Control type="date" name='dateTo' onChange={handleDateChange} value={formData.dateTo} aria-describedby="from-date" />
                    </InputGroup>
                </Col>
            </Row>

            {
                car?.maintenance?.length ?

                <Row>
                    <div className='mt-3 p-0'><span className='fw-bold'>maintenance count: {maintenanceCount}</span></div>
                    <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {car?.maintenance?.map((singleMaintenance, index) =>{
                            return (
                                <tr key={index}>
                                    <td>{ index+1 }</td>
                                    <td>{ new Date(singleMaintenance.createdAt).toLocaleDateString() }</td>
                                    <td>{singleMaintenance.description}</td>
                                    <td><Button onClick={() => handleDetails(singleMaintenance._id)}>details</Button></td>
                                </tr> 
                            )
                        })}
                        
                    </tbody>
                    </Table> 
                    <div>
                        <Paginator page={page} handlePrev={handlePrev} handleNext={handleNext} />  
                    </div>
                </Row>

                :<div className='mt-3'>No maintenance right now</div>
            }
                
            </Row>

        </>
    );

}

export default SingleCar