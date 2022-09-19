import Button from "react-bootstrap/Button";

const SingleMaintenance = ({ maintenance, action }) => {

    return (
        <tr>
            <td>{ maintenance.id }</td>
            <td>{ maintenance.date }</td>
            <td>{ maintenance.car.name }</td>
            <td>{ action }</td>
        </tr>
    );

}

export default SingleMaintenance