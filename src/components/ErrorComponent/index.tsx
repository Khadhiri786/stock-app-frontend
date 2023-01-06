import React from "react";
import { Box, Button, Typography, Grid, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#Edebeb",
      }}
    >
      <Grid container lg={12} direction="column" alignItems="center">
        <Grid item>
          <Card style={{ width: "170vh", height: "70vh", textAlign: "center" }}>
            <Typography variant="h1" style={{ color: "black" }}>
              404
            </Typography>
            <Typography variant="h6" style={{ color: "black" }}>
              The page you’re looking for doesn’t exist.
            </Typography>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={() => {
                navigate("/login");
              }}
            >
              Back Home
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
