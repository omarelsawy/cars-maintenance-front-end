import Maintenance from "../components/Maintenance";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL_COMPANY } from "../utils/Constant";
import Paginator from "../components/Paginator";
import Loader from "../components/Loader";
import { Box, Toolbar } from "@mui/material";
import Layout, { drawerWidth } from "../components/Layout";

const MaintenancePage = () => {
  const API_URL_COMPANY_Var = API_URL_COMPANY();
  const navigate = useNavigate();

  const [enableLoader, setEnableLoader] = useState(true);

  const [cars, setCars] = useState([]);
  const [maintenanceArr, setMaintenanceArr] = useState([]);
  const [page, setPage] = useState(1);
  const [maintenanceCount, setMaintenanceCount] = useState(0);
  const [carSelected, setCarSelected] = useState();

  const perPage = 10;
  let pagesCount = Math.ceil(maintenanceCount / perPage);

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

  async function fetchMaintenance(filter) {
    let response = await fetch(
      `${API_URL_COMPANY_Var}/maintenance?` + new URLSearchParams(filter),
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    let responseJson = await response.json();
    let status = response.status;

    setEnableLoader(false);

    if (status === 200) {
      const maintenanceRes = responseJson?.data?.maintenance;
      const maintenanceCountRes = responseJson?.data?.count;
      setMaintenanceArr(maintenanceRes);
      setMaintenanceCount(maintenanceCountRes);
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

  useEffect(() => {
    let filter = {
      page: page,
      perPage: perPage,
    };

    if (carSelected) {
      filter.carId = carSelected.value;
    }

    fetchMaintenance(filter);
  }, [page, carSelected]);

  const handleCarChange = (selected) => {
    setCarSelected(selected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

          <Row>
            <Col>
              <Link to={"/maintenance/add"}>
                <Button>add Maintenance</Button>
              </Link>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg="5" style={{ color: "black" }}>
              <Select
                onChange={handleCarChange}
                isClearable={true}
                options={cars?.map((car) => {
                  return { value: car._id, label: car.name };
                })}
                value={carSelected}
              />
            </Col>
          </Row>

          <Row>
          {enableLoader && <Loader />}

            <Col>
              {maintenanceArr.length > 0  || enableLoader ? (
                <>
                  <div className="mt-3">
                    <span className="fw-bold">
                      maintenance count: {maintenanceCount}
                    </span>
                  </div>
                  <Maintenance maintenanceArr={maintenanceArr} />
                  <Paginator
                    pagesCount={pagesCount}
                    handleChangePage={handleChangePage}
                  />
                </>
              ) : (
                <div className="mt-3">No maintenance right now</div>
              )}
            </Col>
          </Row>
        </Box>
      </Box>
    </>
  );
};

export default MaintenancePage;
