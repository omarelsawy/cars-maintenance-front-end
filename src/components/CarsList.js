import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
 
const CarsList = ({ cars }) => {

    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/cars/${id}`);
    }

    return (
        
        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Car</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>

                {cars.map((car, index) =>{
                    return (
                        <tr key={index}>
                            <td>{ index + 1 }</td>
                            <td>{ car.name }</td>
                            <td><Button onClick={() => handleDetails(car._id)}>details</Button></td>
                        </tr>
                    )
                })}
                
            </tbody>
        </Table>

    )
}

export default CarsList
