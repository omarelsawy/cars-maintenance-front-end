import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/Constant";
import { API_URL_COMPANY } from "../utils/Constant";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Loader from "../components/Loader";
import { Box } from "@mui/system";
import Layout, { drawerWidth } from "../components/Layout";
import { Toolbar } from "@mui/material";

const SingleMaintenance = () => {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const API_URL_COMPANY_Var = API_URL_COMPANY();

  const params = useParams();
  const navigate = useNavigate();

  const [enableLoader, setEnableLoader] = useState(true);

  const [maintenance, setMaintenance] = useState({});

  async function fetchMaintenance() {
    let response = await fetch(
      `${API_URL_COMPANY_Var}/maintenance/${params.id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    let responseJson = await response.json();
    let status = response.status;

    setEnableLoader(false);

    if (status === 200) {
      const maintenanceRes = responseJson?.data?.singleMaintenance;
      setMaintenance(maintenanceRes);
    } else if (status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      let error = responseJson?.data?.error;
      error && alert(error);
    }
  }

  useEffect(() => {
    fetchMaintenance();
  }, []);

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
              {maintenance.image && (
                <Grid item>
                  <ButtonBase sx={{ width: 200, height: 128 }}>
                    <Img src={`${API_URL}/${maintenance.image}`} />
                  </ButtonBase>
                </Grid>
              )}

              <Grid item container>
                <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      {maintenance.car?.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Description: {maintenance.description}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Date:{" "}
                      {new Date(maintenance.createdAt).toLocaleDateString()}
                    </Typography>
                </Grid>
                {maintenance.price && (
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      ${maintenance.price}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default SingleMaintenance;
