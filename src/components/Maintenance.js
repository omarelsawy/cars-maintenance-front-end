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
                        <SingleMaintenance key={index} maintenance={ maintenance } index={index + 1}/>
                    )
                })}
                
            </tbody>
        </Table>

    )

}

export default Maintenance