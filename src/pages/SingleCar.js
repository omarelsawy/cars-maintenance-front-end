import { useEffect, useState } from "react";
import { Card, Row, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import {API_URL} from '../utils/Constant';

const SingleCar = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [ car, setCar ] = useState({});

    async function fetchCar() {
        let response = await fetch(`${API_URL}/cars/${params.id}`,{
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
        fetchCar();
    }, []);

    const handleDetails = (id) => {
        navigate(`/maintenance/${id}`);
    }

    return (
        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>

            <div className="fw-bold fs-4 d-flex justify-content-center text-uppercase">
                {car.name}
            </div>

            <div className="p-0">
            <Link to={`/maintenance/add?carId=${car._id}&label=${car.name}`}>
                <Button>
                    add Maintenance
                </Button>
            </Link>
            </div>

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