import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const Maintenance = ({ maintenanceArr }) => {

    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/maintenance/${id}`);
    }

    return (
        
        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Car</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>

                {maintenanceArr.map((maintenance, index) =>{
                    return (
                        <tr key={index}>
                            <td>{ index+1 }</td>
                            <td>{ new Date(maintenance.createdAt).toLocaleDateString() }</td>
                            <td>{ maintenance.car.name }</td>
                            <td><Button onClick={() => handleDetails(maintenance._id)}>details</Button></td>
                        </tr> 
                    )
                })}
                
            </tbody>
        </Table>

    )

}

export default Maintenance