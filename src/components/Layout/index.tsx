import React from "react";
import { Box, Grid, Card } from "@mui/material";
import KaniniLogo from "../../assets/Kanini-Logo.svg";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router";
import "./index.css";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <Box>
      <Card variant="outlined">
        <Box className="layout">
          <Grid container spacing={2}>
            <Grid item lg={8}>
              <img src={KaniniLogo} alt="Kanini-Logo" />
            </Grid>
            <Grid item lg={4}>
              <Button
                variant="outlined"
                startIcon={<LockIcon />}
                className="logoutBtn"
                onClick={handleLogOut}
              >
                <span className="logoutBtnTxt">Logout</span>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}
