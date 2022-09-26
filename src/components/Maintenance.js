import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import SingleMaintenance from './SingleMaintenance';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import {API_URL} from '../utils/Constant';

const Maintenance = () => {

    const navigate = useNavigate();
    const [ maintenanceArr, setMaintenanceArr ] = useState([]);
    
    async function fetchMaintenance() {
        let response = await fetch(`${API_URL}/maintenance`,{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const maintenanceRes = responseJson?.data?.maintenance;
            setMaintenanceArr(maintenanceRes);
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

    /* const handleDeleteMaintenance = (id) => {
        let newArr = maintenanceArr.filter( (maintenance) => maintenance._id !== id )
        setMaintenanceArr(newArr)
    } */

    return (
        
        <Col>
        <Link to={'/maintenance/add'}>
            <Button>add Maintenance</Button>
        </Link>

        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>date</th>
                    <th>car</th>
                </tr>
            </thead>
            <tbody>

                {maintenanceArr.map((maintenance, index) =>{
                    return (
                        <SingleMaintenance key={index} maintenance={ maintenance } index={index + 1}/>
                    )
                })}
                
            </tbody>
        </Table>
        </Col>        

    )

}

export default Maintenance