import Table from 'react-bootstrap/Table';
import SingleMaintenance from './SingleMaintenance';

const Maintenance = ({ maintenanceArr }) => {

    return (
        
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
                        <tr key={index}>
                            <td>{ index+1 }</td>
                            <td>{ new Date(maintenance.createdAt).toLocaleDateString() }</td>
                            <td>{ maintenance.car.name }</td>
                        </tr> 
                    )
                })}
                
            </tbody>
        </Table>

    )

}

export default Maintenance