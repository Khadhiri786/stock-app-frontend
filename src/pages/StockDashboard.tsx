import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import Layout from "../components/Layout";
import PriceCard from "../components/PriceCard";
import StarRating from "../components/StarRating";
import StockInformationCard from "../components/StockInformationCard";
import TableComponent from "../components/TableComponent";
import { useParams } from "react-router";

const StockDashboard: React.FC = () => {
  const [stockData, setStockData] = useState([] as any);

  const { stockId } = useParams();
  const tableList = [
    { title: "MARKET CAP", value: stockData?.marketcaptilization },
    { title: "ENTERPRISES VALUE", value: stockData?.enterpricevalue },
    { title: "nO. OF SHARES", value: stockData?.numberofshares },
    { title: "DIV YIELD", value: stockData?.dividentyield },
    { title: "CASH", value: stockData?.cashinm },
    { title: "PROMOTER HOLDING", value: stockData?.debtinm
  },
  ];
  const stockList = [
    { totalCount: "8", title: "Strengths", value: stockData?.strength },
    { totalCount: "9", title: "Weaknesses", value: stockData?.weakness },
    {
      totalCount: "3",
      title: "Opportunities",
      value: stockData?.opportunities,
    },
    { totalCount: "0", title: "Threads", value: stockData?.threats },
  ];
  const totalReviews = [
    {
      tagName: "Stable",
      title: "Ownership",
      rating: Math.round(stockData?.ownership),
    },
    {
      tagName: "Expensive",
      title: "Valuation",
      rating: Math.round(stockData?.valuation),
    },
    {
      tagName: "Optional",
      title: "Efficiency",
      rating: Math.round(stockData?.efficiency),
    },
    {
      tagName: "Average",
      title: "Financials",
      rating: Math.round(stockData?.financials),
    },
  ];
  useEffect(() => {
    axios
      .get(`http://localhost:5000/stock/${stockId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res?.data);
        setStockData(res?.data);
      });
      
  }, []);

  return (
    <div>
      <Layout />
      <div style={{ padding: "10px", backgroundColor: "#EDEBEB" }}>
        <HeaderComponent
          currentDateTime={stockData?.currentDateTime}
          bse={stockData?.bselistedname}
          nse={stockData?.nselistedname}
          currentPrice={stockData?.currenttradingprice}
          variationPrice={stockData?.variationprice}
          title={stockData?.companyname}
          variationPercentage={stockData?.variationpercentage}
          sector={`${stockData?.companyname} - Exploration`}
        />
        <PriceCard
          high52Rate={stockData?.high52w}
          low52Rate={stockData?.low52w}
          todaysLowRate={stockData?.todayslow}
          todaysHighRate={stockData?.todayshigh}
        />
        <Grid container>
          <Grid item lg={8}>
            <Grid container>
              <Grid item lg={12}>
                <StockInformationCard stockList={stockList} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={12}>
                <StarRating
                  maxStarCount={5}
                  ratingValue={3}
                  totalCount={44}
                  totalReviews={totalReviews}
                  finStarRating={Math.round(stockData?.ownership)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4}>
            <TableComponent title="Company Essential" list={tableList} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default StockDashboard;
