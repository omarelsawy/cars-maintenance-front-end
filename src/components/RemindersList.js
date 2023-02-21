import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
 
const RemindersList = ({ reminders }) => {

    return (
        
        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Car</th>
                </tr>
            </thead>
            <tbody>

                {reminders.map((reminder, index) =>{
                    return (
                        <tr key={index}>
                            <td>{ index + 1 }</td>
                            <td>{ reminder.description }</td>
                            <td>{ new Date(reminder.reminderDate).toLocaleString() }</td>
                            <td>{ reminder.car?.name }</td>
                        </tr>
                    )
                })}
                
            </tbody>
        </Table>

    )
}

export default RemindersList
