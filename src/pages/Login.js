import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../utils/Constant';
import Loader from '../components/Loader';

const Login = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const [ disableSubmit, setDisableSubmit ] = useState(false);
    const [ enableLoader, setEnableLoader ] = useState(false);

    useEffect(() => {
        if(token){
            navigate('/');
        }
    });

    const [ formData, setFormData ] = useState(
        { email: "", password: "" }
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
        setDisableSubmit(true)
        setEnableLoader(true)

        let response = await fetch(`${API_URL}/users/get-token`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "email": formData.email,
             "password": formData.password,
             "webPushToken": localStorage.getItem("webPushToken")
            })
        });

        let status = response.status;
        let responseJson = await response.json();
        const token = responseJson?.data?.token;
        const slug = responseJson?.data?.company?.slug;

        setEnableLoader(false)

        if(status === 200 && token){
            localStorage.setItem("token", token);
            localStorage.setItem("slug", slug);

            setTimeout(()=> {
                navigate('/');
            }, 1000);
        }
        else{
            let error = responseJson?.data?.error
            error ? alert(error) : alert('not authorized')
        }
        
    }

    return (

            <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center'
                style={{
                    height: '100vh',
                    backgroundImage: `url(images/akX8JA.png)`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
            >
            {enableLoader && <Loader />}

                <Form.Group controlId="formBasicEmail" className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleChange} name = "email" value={formData.email} type="email" required></Form.Control>
                </Form.Group>

                <Form.Group controlId="fromBasicPassword" className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} name = "password" value={formData.password} type="password" required></Form.Control>
                </Form.Group>

                <Button disabled={disableSubmit} variant="primary" type="submit">Login</Button>

            </Form>

    )

}

export default Login