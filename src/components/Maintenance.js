import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import SingleMaintenance from './SingleMaintenance';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Maintenance = () => {
    
    const [ maintenanceArr, setMaintenanceArr ] = useState([]);
    
    async function fetchMaintenance() {
        let response = await fetch('http://localhost:3001/maintenance');
        let responseJson = await response.json();

        const maintenanceRes = responseJson.data.maintenance;

        setMaintenanceArr(maintenanceRes);
    }

    useEffect(() => {
        fetchMaintenance();
    }, []);

    const handleAddMaintenance = () => {
        fetch('http://localhost:3001/maintenance', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "carId": '632c3cc27c0569d3871b37bf'
            })
        });

        fetchMaintenance();

        /* setMaintenanceArr( (prevMaintenanceArr) => {
            return [...prevMaintenanceArr ,
                { id: 3, date: '2022-09-18', car: {id: 2, name: 'Nissan'} }                
            ];
        } ) */
    }

    const handleDeleteMaintenance = (id) => {
        let newArr = maintenanceArr.filter( (maintenance) => maintenance._id !== id )
        setMaintenanceArr(newArr)
    }

    return (
        
        <Col>
        <Button onClick={handleAddMaintenance}>add Maintenance</Button>

        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>date</th>
                    <th>car</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {maintenanceArr.map((maintenance, index) =>{
                    return (
                        <SingleMaintenance key={index} maintenance={ maintenance } index={index + 1}
                            action = {<Button onClick={ () => handleDeleteMaintenance(maintenance._id)}>delete</Button>}
                        />
                    )
                })}
                
            </tbody>
        </Table>
        </Col>        

    )

}

export default Maintenance