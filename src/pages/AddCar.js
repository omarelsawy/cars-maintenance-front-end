import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { API_URL_COMPANY } from "../utils/Constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Alert, Box, Toolbar } from "@mui/material";
import Loader from "../components/Loader";
import Layout, { drawerWidth } from "../components/Layout";

const AddCar = () => {
  const [alertSuccessCreated, setAlertSuccessCreated] = useState(false);
  const API_URL_COMPANY_Var = API_URL_COMPANY();
  const navigate = useNavigate();

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [enableLoader, setEnableLoader] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    subType: "",
    color: "",
    model: "",
    numberPlate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormDate) => {
      return {
        ...prevFormDate,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableSubmit(true);
    setEnableLoader(true);

    let response = await fetch(`${API_URL_COMPANY_Var}/cars`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    let status = response.status;
    let responseJson = await response.json();

    setEnableLoader(false);

    if (status === 201) {
      setAlertSuccessCreated(true);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } else {
      let error = responseJson?.data?.error;
      alert(error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Layout title={'Cars'}/>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <form onSubmit={handleSubmit}>
            {alertSuccessCreated && <Alert>success</Alert>}
            {enableLoader && <Loader />}

            <Col lg="5">
              <Form.Group className="mb-3">
                <Form.Label>Car Name</Form.Label>
                <span style={{ color: "red" }}>*</span>
                <Form.Control placeholder="example: nissan sunny black 2012"
                  onChange={handleChange}
                  name="name"
                  value={formData.name}
                  required
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col lg="5">
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="type"
                  value={formData.type}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col lg="5">
              <Form.Group className="mb-3">
                <Form.Label>Sub Type</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="subType"
                  value={formData.subType}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col lg="5">
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="color"
                  value={formData.color}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col lg="5">
              <Form.Group className="mb-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="model"
                  value={formData.model}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col lg="5">
              <Form.Group className="mb-3">
                <Form.Label>Number Plate</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="numberPlate"
                  value={formData.numberPlate}
                ></Form.Control>
              </Form.Group>
            </Col>

            <div>
              <Button
                disabled={disableSubmit}
                className="mt-3"
                type="submit"
                variant="primary"
              >
                Save
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddCar;
