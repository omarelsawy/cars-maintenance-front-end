import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import {API_URL} from '../utils/Constant';
import {API_URL_COMPANY} from '../utils/Constant';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const AddMaintenance = () => {

    const API_URL_COMPANY_Var = API_URL_COMPANY();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const carIdQuery = searchParams.get('carId');
    const labelQuery = searchParams.get('label');

    const [ formData, setFormData ] = useState(
        { price: "", description: "", image: "" }
    );
    const [ cars, setCars ] = useState([]);

    let carSelectedInit;

    if(carIdQuery && labelQuery){
        carSelectedInit = {value: carIdQuery, label: labelQuery};
    }

    const [ carSelected, setCarSelected ] = useState(carSelectedInit);

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

    useEffect(() => {
        fetchCars();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData()
        data.append('price', formData.price);
        data.append('carId', carSelected.value);
        data.append('image', formData.image);
        data.append('description', formData.description);

        let response = await fetch(`${API_URL_COMPANY_Var}/maintenance`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: data
        });

        let status = response.status;
        let responseJson = await response.json();

        if(status === 201){
            alert('success')
            navigate(-1);
        }
        else{
            let error = responseJson?.data?.error
            alert(error)
        }
        
    }

    const handleCarChange = (selected) => {
        setCarSelected(selected)
    }

    const handleChange = (event) => {

        const name = event.target.name
        let value

        if(name === 'image'){
            value = event.target.files[0]
        }
        else{
            value = event.target.value
        }        
        
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
                
            <Form onSubmit={handleSubmit}>

                <Col lg='4'>
                    Car
                    <Select
                        onChange={handleCarChange}
                        options={cars.map(car=>{
                            return {'value': car._id, 'label': car.name}
                        })}
                        value = {carSelected}
                    />
                </Col>

                <Col lg='4' className='mt-3'>
                <Form.Group controlId="formBasicPrice" className='mb-3'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={handleChange} name = "price" value={formData.price}></Form.Control>
                </Form.Group>
                </Col>

                <Col lg='4' className='mt-3'>
                <Form.Group controlId="formBasicDescription" className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={handleChange} value={formData.description} name="description" as="textarea" rows={3} />
                </Form.Group>
                </Col>

                <Col lg='4' className='mt-3'>
                <Form.Group controlId="formBasicImage" className='mb-3'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file' onChange={handleChange} name = "image" ></Form.Control>
                </Form.Group>
                </Col>

                <Button className='mt-3' variant="primary" type="submit">Save</Button>

            </Form>

            </Row>

        </>
    )

}

export default AddMaintenance;