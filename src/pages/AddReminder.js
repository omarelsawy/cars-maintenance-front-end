import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import { API_URL_COMPANY } from "../utils/Constant";
import moment from 'moment';

const AddReminder = () => {

    const API_URL_COMPANY_Var = API_URL_COMPANY();
    const navigate = useNavigate();

    const [ cars, setCars ] = useState([]);

    const [ formData, setFormData ] = useState(
        { description: "", carId: "", reminderDate: "" }
    );

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

    const handleCarChange = (selected) => {
        setFormData(prevFormDate => {
            return { 
                ...prevFormDate,
                carId: selected.value
            };
        })
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

    const handleSubmit = async (e) => {

        e.preventDefault()

        let response = await fetch(`${API_URL_COMPANY_Var}/reminders`, {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                ...formData
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

    return (
        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>
                
            <Form onSubmit={handleSubmit}>

                <Col lg='5'>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <span style={{color:'red'}}>*</span>
                        <Form.Control as="textarea" onChange={handleChange} name = "description" value={formData.description} required></Form.Control>
                    </Form.Group>
                </Col>

                <Col lg='5'>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <span style={{color:'red'}}>*</span>
                        <Form.Control type="datetime-local" min={ moment().format('YYYY-MM-DDThh:mm') } onChange={handleChange} name = "reminderDate" value={formData.reminderDate} required></Form.Control>
                    </Form.Group>
                </Col>

                <Col lg='5'>
                    Car
                    <Select className="mb-3"
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

export default AddReminder