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

const SingleCar = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [ car, setCar ] = useState({});
    const [ formData, setFormData ] = useState({
        dateFrom: "", dateTo: ""
    });

    async function fetchCar(filter) {
        let response = await fetch(`${API_URL_COMPANY}/cars/${params.id}?` + new URLSearchParams(filter),{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const carRes = responseJson?.data?.car;
            setCar(carRes);
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
        fetchCar({...formData});
    }, [formData]);

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

    return (
        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>

            <Col lg className='p-0'>
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

            <Col>
                <Link to={`/maintenance/add?carId=${car._id}&label=${car.name}`}>
                    <Button className='float-end'>
                        add Maintenance
                    </Button>
                </Link>
            </Col>

            <Row>
                <Col className='p-0'>
                    <InputGroup>
                        <InputGroup.Text id="from-date">
                            FromDate
                        </InputGroup.Text>
                        <Form.Control type="date" name='dateFrom' onChange={handleDateChange} value={formData.dateFrom} aria-describedby="from-date" />
                    </InputGroup>
                </Col>

                <Col className='p-0 ms-2'>
                    <InputGroup>
                        <InputGroup.Text id="from-date">
                            ToDate
                        </InputGroup.Text>
                        <Form.Control type="date" name='dateTo' onChange={handleDateChange} value={formData.dateTo} aria-describedby="from-date" />
                    </InputGroup>
                </Col>
            </Row>

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
                
            </Row>

        </>
    );

}

export default SingleCar