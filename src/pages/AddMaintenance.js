import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import { API_URL_COMPANY } from "../utils/Constant";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Alert, Box, Toolbar } from "@mui/material";
import Loader from "../components/Loader";
import Layout, { drawerWidth } from "../components/Layout";

const AddMaintenance = () => {
  const [alertSuccessCreated, setAlertSuccessCreated] = useState(false);
  const API_URL_COMPANY_Var = API_URL_COMPANY();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const carIdQuery = searchParams.get("carId");
  const labelQuery = searchParams.get("label");

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [enableLoader, setEnableLoader] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    maintenanceDate: "",
    price: "",
    image: "",
  });
  const [cars, setCars] = useState([]);

  let carSelectedInit;

  if (carIdQuery && labelQuery) {
    carSelectedInit = { value: carIdQuery, label: labelQuery };
  }

  const [carSelected, setCarSelected] = useState(carSelectedInit);

  async function fetchCars() {
    let response = await fetch(`${API_URL_COMPANY_Var}/cars`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    let responseJson = await response.json();
    let status = response.status;

    if (status === 200) {
      const carsRes = responseJson?.data?.cars;
      setCars(carsRes);
    } else if (status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      let error = responseJson?.data?.error;
      error && alert(error);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisableSubmit(true);
    setEnableLoader(true);

    let data = new FormData();
    data.append("price", formData.price);
    data.append("carId", carSelected.value);
    data.append("image", formData.image);
    data.append("description", formData.description);
    data.append("maintenanceDate", formData.maintenanceDate);

    let response = await fetch(`${API_URL_COMPANY_Var}/maintenance`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
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

  const handleCarChange = (selected) => {
    setCarSelected(selected);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    let value;

    if (name === "image") {
      value = event.target.files[0];
    } else {
      value = event.target.value;
    }

    setFormData((prevFormDate) => {
      return {
        ...prevFormDate,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Layout title={'Maintenance'}/>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          {alertSuccessCreated && <Alert>success</Alert>}
          {enableLoader && <Loader />}

          <Form onSubmit={handleSubmit}>
            <Col lg="4">
              Car
              <span style={{ color: "red" }}>*</span>
              <Select
                styles={{
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "black",
                  }),
                }}
                onChange={handleCarChange}
                options={cars.map((car) => {
                  return { value: car._id, label: car.name };
                })}
                value={carSelected}
              />
            </Col>

            <Col lg="4" className="mt-3">
              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <span style={{ color: "red" }}>*</span>
                <Form.Control
                  onChange={handleChange}
                  value={formData.description}
                  name="description"
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </Col>

            <Col lg="4" className="mt-3">
              <Form.Group >
                <Form.Label>Date</Form.Label>
                <span style={{ color: "red" }}>*</span>
                <Form.Control
                  type="datetime-local"
                  onChange={handleChange}
                  name="maintenanceDate"
                  value={formData.maintenanceDate}
                  required
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col lg="4" className="mt-3">
              <Form.Group controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="price"
                  value={formData.price}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col lg="4" className="mt-3">
              <Form.Group controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleChange}
                  name="image"
                ></Form.Control>
              </Form.Group>
            </Col>

            <Button
              disabled={disableSubmit}
              className="mt-3"
              variant="primary"
              type="submit"
            >
              Save
            </Button>
          </Form>
        </Box>
      </Box>
    </>
  );
};

export default AddMaintenance;
