import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import "./index.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

type StockInformationCardProps = {
  stockList: { totalCount: string; title: string; value: string }[];
};

const StockInformationCard: React.FC<StockInformationCardProps> = (
  props: StockInformationCardProps
) => {
  const { stockList } = props;
  return (
    <>
      <Box>
        <Card style={{ marginTop: "25px", marginRight: "25px" }}>
          <Grid container lg={12}>
            {stockList?.map((item) => (
              <Grid
                item
                lg={3}
                style={{ textAlign: "center", padding: "20px" }}
                key={item?.title}
              >
                <Card
                  style={{
                    backgroundColor: "#eff4ff",
                    paddingRight: "10px",
                    paddingBottom: "25px",
                    minHeight: "135px",
                  }}
                >
                  <Avatar className="avatar"> {item?.totalCount}</Avatar>
                  <div>
                    <Typography
                      className="title"
                      fontWeight="bold"
                      variant="h6"
                    >
                      {item?.title}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="description">
                      {" "}
                      {item?.value}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Box>
    </>
  );
};
export default StockInformationCard;
