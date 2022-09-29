import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {API_URL} from '../utils/Constant';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
    
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState(
        { name: "" }
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await fetch(`${API_URL}/cars`, {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
             "name": formData.name
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

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={handleChange} name = "name" value={formData.name} required></Form.Control>
                    </Form.Group>

                    <Button className='mt-3' variant="primary" type="submit">Save</Button>

                </Form>
            </Row>

        </>
    )

}

export default AddCar;