import { useEffect, useState } from "react";
import { Card, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import {API_URL} from '../utils/Constant';
import {API_URL_COMPANY} from '../utils/Constant';

const SingleOrder = () => {

    const API_URL_COMPANY_Var = API_URL_COMPANY();

    const params = useParams();
    const navigate = useNavigate();

    const [ order, setOrder ] = useState({});

    async function fetchOrder() {
        let response = await fetch(`${API_URL_COMPANY_Var}/orders/${params.id}`,{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const orderRes = responseJson?.data?.order;
            setOrder(orderRes);
        }
        else if(status === 401){
            localStorage.removeItem("token");
            navigate('/login');
        }
        else{
            let error = responseJson?.data?.error
            error && alert(error);
        }
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>

            <Card>            
            <Card.Body>
                
                <Card.Title>{ order.car?.name }</Card.Title>
                
                <Card.Text>
                    Description: { order.description }
                </Card.Text>
                
                <Card.Text>
                    Start: { new Date(order.start).toLocaleString() }
                </Card.Text>

                <Card.Text>
                    End: { new Date(order.end).toLocaleString() }
                </Card.Text>

                <Card.Text>
                    Address: { order.address }
                </Card.Text>

                <Card.Text>
                    Contact: { order.contact }
                </Card.Text>

                <Card.Text>
                    By: { order.creator?.name }
                </Card.Text>

            </Card.Body>
            </Card>
                
            </Row>

        </>
    );

}

export default SingleOrder