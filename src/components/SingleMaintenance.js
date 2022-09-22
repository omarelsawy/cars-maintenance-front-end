import Button from "react-bootstrap/Button";

const SingleMaintenance = ({ index, maintenance, action }) => {

    return (
        <tr>
            <td>{ index }</td>
            <td>{ new Date(maintenance.createdAt).toLocaleDateString() }</td>
            <td>{ maintenance.car.name }</td>
            <td>{ action }</td>
        </tr>
    );

}

export default SingleMaintenance