import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Grid, Card, Typography, Box, Link, Avatar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import SearchIcon from "../../assets/search-icon.svg";
import Layout from "../Layout";
import axios from "axios";
import TagComponent from "../TagComponent";

const Dashboard = () => {
  const [trendingStock, setTrendingStock] = useState([] as any);
  const [stockData, setStockData] = useState([] as any);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/getSearchSuggestions")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const data = response?.data;
          const value = data?.map((item: any) => ({
            title: item?.companyname,
            id: item?.stockid,
            nse: item?.nselistedname,
          }));
          setStockData(value);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7007/Stocks/GetTrendingStocks")
      .then((response) => {
        setTrendingStock(response?.data);
      });
  }, []);
  useEffect(() => {
    try {
      setInterval(async () => {
        const res = await fetch(
          "https://localhost:7007/Stocks/GetTrendingStocks"
        );
        const stockData = await res.json();
        setTrendingStock(stockData);
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <Layout />
      <div className="dashboardBackgrond">
        <Grid container style={{ textAlign: "center" }}>
          <Grid item lg={12} style={{ marginTop: "50px" }}>
            <Typography
              gutterBottom
              variant="h3"
              marginLeft={"35px"}
              style={{ paddingRight: "80px" }}
              fontWeight="bold"
              fontFamily={"Rozha One"}
            >
              {" "}
              Investing Search Engine
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          lg={12}
          style={{ textAlign: "center", marginLeft: "30px" }}
          justifyContent="center"
        >
          <Grid item lg={12}>
            {" "}
            <Typography
             variant="h6"
             fontFamily="Rozha One"
             fontWeight="500"
             fontSize="20px"
             marginRight="100px"
            
             
              style={{ lineHeight: "41px" }}
            >
              The Morden Stock Screener that helps you pick better stocks
            </Typography>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Autocomplete
              id="country-select-demo"
              sx={{ width: 550 }}
              options={stockData}
              onChange={(event, value) => {
                navigate(`/stock/${value.id}`);
              }}
              autoHighlight
              getOptionLabel={(option: any) => option.title}
              renderOption={(props, option: any) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <Grid container>
                    <Grid
                      item
                      lg={9}
                      onClick={() => {
                        navigate(`/stock/${option.id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {option.title}
                    </Grid>
                    <Grid
                      item
                      lg={3}
                      onClick={() => {
                        navigate(`/stock/${option.id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <TagComponent value={option.nse} bgColor={"#0078FF"} />
                    </Grid>
                  </Grid>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  style={{ height: "35px" }}
                  {...params}
                  placeholder="  Search Stock Company"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container style={{ textAlign: "center" }}>
          <Grid item lg={12}>
            <Typography fontFamily={"Inter"} fontWeight="600" fontSize={"20px"}>
              What's Trending
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ marginTop: "10px",marginLeft:'50px' }}>
          {trendingStock?.map((item: any) => (
            <Grid item lg={2} style={{ marginLeft: "10px",backgroundColor:"#EDEBEB0",opacity:'0.8',padding:'12px',border:'none' }}>
              <Card style={{ textAlign: "center" }}><>
                <Link href={`/stock/${item?.stockId}`} >
                  {item?.stockName}
                </Link>

                </>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
export default Dashboard;
