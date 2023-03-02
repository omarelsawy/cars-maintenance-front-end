import CarsList from "../components/CarsList";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL_COMPANY } from "../utils/Constant";
import Paginator from "../components/Paginator";
import Loader from "../components/Loader";
import { Box, Toolbar } from "@mui/material";
import Layout, { drawerWidth } from "../components/Layout";

const Cars = () => {
  const API_URL_COMPANY_Var = API_URL_COMPANY();

  const navigate = useNavigate();

  const [enableLoader, setEnableLoader] = useState(true);

  const [carsArr, setCarsArr] = useState([]);
  const [page, setPage] = useState(1);
  const [carsCount, setCarsCount] = useState(0);

  const perPage = 10;
  let pagesCount = Math.ceil(carsCount / perPage);

  async function fetchCars(filter) {
    let response = await fetch(
      `${API_URL_COMPANY_Var}/cars?` + new URLSearchParams(filter),
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    let responseJson = await response.json();
    let status = response.status;

    setEnableLoader(false);

    if (status === 200) {
      const carsRes = responseJson?.data?.cars;
      const carsCountRes = responseJson?.data?.count;
      setCarsArr(carsRes);
      setCarsCount(carsCountRes);
    } else if (status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      let error = responseJson?.data?.error;
      error && alert(error);
    }
  }

  useEffect(() => {
    let filter = {
      page: page,
      perPage: perPage,
    };
    fetchCars(filter);
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

          <Col>
            <Link to={"/cars/add"}>
              <Button>Add Car</Button>
            </Link>
          </Col>

          <Row>
          {enableLoader && <Loader />}

            <Col>
              {carsArr.length > 0 || enableLoader ? 
                <>
                  <div className="mt-3">
                    <span className="fw-bold">cars count: {carsCount}</span>
                  </div>
                  <CarsList cars={carsArr} />
                  <Paginator
                    pagesCount={pagesCount}
                    handleChangePage={handleChangePage}
                  />
                </>
               : 
                <div className="mt-3">No cars right now</div>
              }
            </Col>
          </Row>
        </Box>
      </Box>
    </>
  );
};

export default Cars;
