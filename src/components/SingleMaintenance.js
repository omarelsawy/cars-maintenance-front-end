import Button from "react-bootstrap/Button";

const SingleMaintenance = ({ index, maintenance }) => {

    return (
        <tr>
            <td>{ index }</td>
            <td>{ new Date(maintenance.createdAt).toLocaleDateString() }</td>
            <td>{ maintenance.car.name }</td>
        </tr>
    );

}

export default SingleMaintenance