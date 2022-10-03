import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const SingleMaintenance = ({ maintenance }) => {

    const params = useParams();

    return (
        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>

                single
                
            </Row>

        </>
    );

}

export default SingleMaintenance