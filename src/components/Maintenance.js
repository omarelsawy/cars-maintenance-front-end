import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import SingleMaintenance from './SingleMaintenance';
import Button from 'react-bootstrap/Button';

const Maintenance = () => {
    
    const [ maintenanceArr, setMaintenanceArr ] = useState([]);

    useEffect(() => {

        const maintenanceRes = [
            { id: 1, date: '2022-09-18', car: {id: 1, name: 'peugeot'} },
            { id: 2, date: '2022-09-18', car: {id: 2, name: 'Nissan'} }
        ];

        setMaintenanceArr(maintenanceRes);

    }, []);

    const handleAddMaintenance = () => {
        setMaintenanceArr( (prevMaintenanceArr) => {
            return [...prevMaintenanceArr ,
                { id: 3, date: '2022-09-18', car: {id: 2, name: 'Nissan'} }                
            ];
        } )
    }

    const handleDeleteMaintenance = (id) => {
        let newArr = maintenanceArr.filter( (maintenance) => maintenance.id !== id )
        setMaintenanceArr(newArr)
    }

    return (
        
        <div>
        <Button onClick={handleAddMaintenance}>add Maintenance</Button>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>date</th>
                    <th>car</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

                {maintenanceArr.map((maintenance) =>{
                    return (
                        <SingleMaintenance key={maintenance.id} maintenance={ maintenance } 
                            action = {<Button onClick={ () => handleDeleteMaintenance(maintenance.id)}>delete</Button>}
                        />
                    )
                })}
                
            </tbody>
        </Table>
        </div>        

    )

}

export default Maintenance