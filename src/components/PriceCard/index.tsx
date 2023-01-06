import React from "react";
import Box from "@mui/material/Box";
import "./index.css";
import highicon from "../../assets/high-icon.svg";
import lowicon from "../../assets/low-icon.svg";
import high52W from "../../assets/week-high-icon.svg";
import low52W from "../../assets/week-low-icon.svg";
import { Card, Grid, Typography } from "@mui/material";

type PriceCardProps = {
  high52Rate: string;
  low52Rate: string;
  todaysHighRate: string;
  todaysLowRate: string;
};

const PriceCard: React.FC<PriceCardProps> = (props: PriceCardProps) => {
  const { high52Rate, low52Rate, todaysHighRate, todaysLowRate } = props;
  const list = [
    { title: "Today's High", price: todaysHighRate, image: highicon },
    { title: "Today's Low", price: todaysLowRate, image: lowicon },
    { title: "52 Week High", price: high52Rate, image: high52W },
    { title: "52 Week Low", price: low52Rate, image: low52W },
  ];
  return (
    <>
      <Box>
        <Grid container spacing={2} style={{marginTop:'10px'}}>
          {list?.map((item) => (
            <Grid item lg={3} key={item?.title}>
              <Card style={{ padding: "20px" }}>
                <Grid container lg={12}>
                  <Grid item lg={5}>
                    <img
                      style={{ width: "70px" }}
                      src={item?.image}
                      alt="icon"
                      className="high-icon"
                    />
                  </Grid>
                  <Grid item lg={7}>
                    <Typography variant="h6"> {item?.title}</Typography>
                    <Typography variant="h6" gutterBottom>
                      {`${item?.price}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default PriceCard;
