import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import {API_URL} from '../utils/Constant';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const AddMaintenance = () => {

    const navigate = useNavigate();

    const [ formData, setFormData ] = useState(
        { carId: "" }
    );
    const [ cars, setCars ] = useState([]);

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

    useEffect(() => {
        fetchCars();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await fetch(`${API_URL}/maintenance`, {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
             "carId": formData.carId
            })
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
        setFormData(prevFormDate => {
            return { 
                ...prevFormDate,
                'carId': selected.value
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
                    <Select
                        onChange={handleCarChange}
                        options={cars.map(car=>{
                            return {'value': car._id, 'label': car.name}
                        })}
                    />
                </Col>

                <Button className='mt-3' variant="primary" type="submit">Save</Button>

            </Form>

            </Row>

        </>
    )

}

export default AddMaintenance;