import { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import {API_URL} from '../utils/Constant';

const SingleMaintenance = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [ maintenance, setMaintenance ] = useState({});

    async function fetchMaintenance() {
        let response = await fetch(`${API_URL}/maintenance/${params.id}`,{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const maintenanceRes = responseJson?.data?.singleMaintenance;
            setMaintenance(maintenanceRes);
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
        fetchMaintenance();
    }, []);

    return (
        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>

            <Card>
            {maintenance.image && <Card.Img className="w-50 mt-3" src={`${API_URL}/${maintenance.image}`} />}    
            
            <Card.Body>
                <Card.Title>{ maintenance.car?.name }</Card.Title>
                <Card.Text>
                    Date: { new Date(maintenance.createdAt).toLocaleDateString() }
                </Card.Text>
                <Card.Text>
                    Description: { maintenance.description }
                </Card.Text>
                <Card.Text>
                    Price: { maintenance.price } $
                </Card.Text>
            </Card.Body>
            </Card>
                
            </Row>

        </>
    );

}

export default SingleMaintenance