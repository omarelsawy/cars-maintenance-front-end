import Table from 'react-bootstrap/Table';
 
const CarsList = ({ cars }) => {
    return (
        
        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>car</th>
                </tr>
            </thead>
            <tbody>

                {cars.map((car, index) =>{
                    return (
                        <tr key={index}>
                            <td>{ index + 1 }</td>
                            <td>{ car.name }</td>
                        </tr>
                    )
                })}
                
            </tbody>
        </Table>

    )
}

export default CarsList
