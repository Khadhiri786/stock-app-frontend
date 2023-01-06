import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ChangeHistoryTwoToneIcon from "@mui/icons-material/ChangeHistoryTwoTone";
import "./index.css";
import TagComponent from "../TagComponent";
import { useNavigate } from "react-router";

type HeaderComponentProps = {
  title: string;
  nse: string;
  bse: string;
  currentDateTime: string;
  sector: string;
  currentPrice: string; //142.35
  variationPrice: string; //+1.65
  variationPercentage: string; //1.17%
};

const HeaderComponent = (props: HeaderComponentProps) => {
  const {
    title,
    nse,
    bse,
    currentDateTime,
    sector,
    currentPrice,
    variationPrice,
    variationPercentage,
  } = props;
  const navigate = useNavigate();
  return (
    <div>
      <Grid container>
        <Grid>
          <Typography className=".title">
            {" "}
            <ArrowBackIosOutlinedIcon
              onClick={() => {
                navigate("/dashboard");
              }}
              style={{ cursor: "pointer", fontSize: "0.8rem" }}
            />
            Back
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid lg={10}>
          <Typography gutterBottom variant="h5">
            {" "}
            {title}
          </Typography>
        </Grid>
        <Grid lg={2}>
          {" "}
          <Grid container>
            <Grid item>
              <Button variant="contained" className="triangleButton">
                <ChangeHistoryTwoToneIcon />
                {currentPrice}
              </Button>
            </Grid>
            <Grid spacing={2} style={{ paddingLeft: "10px" }}>
              <Grid container>
                <Typography>
                  {variationPrice}({variationPercentage}%)
                </Typography>
              </Grid>
              <Grid container>
                <Typography fontSize="10px" gutterBottom>
                  NSE: <span style={{ color: "grey" }}> {currentDateTime}</span>{" "}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid>
          NSE: <TagComponent value={nse} bgColor={"#b9dd4E"} /> BSE:{" "}
          <TagComponent value={bse} bgColor={"#b9dd4E"} /> SECTOR:
          <Button color="success">{sector}</Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default HeaderComponent;
