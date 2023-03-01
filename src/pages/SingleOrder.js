import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL_COMPANY } from "../utils/Constant";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Loader from "../components/Loader";
import { Box } from "@mui/system";
import Layout, { drawerWidth } from "../components/Layout";
import { Toolbar } from "@mui/material";

const SingleOrder = () => {
  const API_URL_COMPANY_Var = API_URL_COMPANY();

  const params = useParams();
  const navigate = useNavigate();
  const [enableLoader, setEnableLoader] = useState(true);

  const [order, setOrder] = useState({});

  async function fetchOrder() {
    let response = await fetch(`${API_URL_COMPANY_Var}/orders/${params.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    let responseJson = await response.json();
    let status = response.status;

    setEnableLoader(false);

    if (status === 200) {
      const orderRes = responseJson?.data?.order;
      setOrder(orderRes);
    } else if (status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      let error = responseJson?.data?.error;
      error && alert(error);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Layout />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          <Paper
            sx={{
              p: 2,
              margin: "auto",
              marginTop: 1,
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            {enableLoader && <Loader />}

            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      {order.car?.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Description: {order.description}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Start: {new Date(order.start).toLocaleString()}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      End: {new Date(order.end).toLocaleString()}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Address: {order.address}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Contact: {order.contact}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      By: {order.creator?.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default SingleOrder;
