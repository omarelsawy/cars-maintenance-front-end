import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {API_URL_COMPANY} from '../utils/Constant';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { Alert } from '@mui/material';
import Loader from '../components/Loader';

const AddCar = () => {

    const [ alertSuccessCreated, setAlertSuccessCreated ] = useState(false);
    const API_URL_COMPANY_Var = API_URL_COMPANY();
    const navigate = useNavigate();

    const [ disableSubmit, setDisableSubmit ] = useState(false);
    const [ enableLoader, setEnableLoader ] = useState(false);

    const [ formData, setFormData ] = useState(
        { name: "", type: "", subType: "", color: "", model: "", numberPlate: "" }
    );

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
        setDisableSubmit(true)
        setEnableLoader(true)

        let response = await fetch(`${API_URL_COMPANY_Var}/cars`, {
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
        
        setEnableLoader(false)

        if(status === 201){
            setAlertSuccessCreated(true)
            setTimeout(()=>{
                navigate(-1);
            }, 1500)
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
            <form onSubmit={handleSubmit}>
            <Row className='m-3 float-end' style={{ width: '80%' }}>

            {alertSuccessCreated && <Alert>success</Alert>}
            {enableLoader && <Loader />}
                
                <Col lg='5'>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <span style={{color:'red'}}>*</span>
                        <Form.Control onChange={handleChange} name = "name" value={formData.name} required></Form.Control>
                    </Form.Group>
                </Col>

                <Col lg='5'>
                    <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Control onChange={handleChange} name = "type" value={formData.type}></Form.Control>
                    </Form.Group>
                </Col>

                <Col lg='5'>
                    <Form.Group className="mb-3">
                        <Form.Label>Sub Type</Form.Label>
                        <Form.Control onChange={handleChange} name = "subType" value={formData.subType}></Form.Control>
                    </Form.Group>
                </Col>

                <Col lg='5'>
                    <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Control onChange={handleChange} name = "color" value={formData.color}></Form.Control>
                    </Form.Group>
                </Col>

                <Col lg='5'>
                    <Form.Group className="mb-3">
                        <Form.Label>Model</Form.Label>
                        <Form.Control onChange={handleChange} name = "model" value={formData.model}></Form.Control>
                    </Form.Group>
                </Col>

                <Col lg='5'>
                    <Form.Group className="mb-3">
                        <Form.Label>Number Plate</Form.Label>
                        <Form.Control onChange={handleChange} name = "numberPlate" value={formData.numberPlate}></Form.Control>
                    </Form.Group>
                </Col>

                <div>
                    <Button disabled={disableSubmit} size="lg" className='mt-3 w-25' type='submit' variant="primary">Save</Button>
                </div>

            </Row>
            </form>

        </>
    )

}

export default AddCar;