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
    { title: "MARKET CAP", value: stockData?.marketCaptilization },
    { title: "ENTERPRISES VALUE", value: stockData?.enterpriceValue },
    { title: "nO. OF SHARES", value: stockData?.numberOfShares },
    { title: "DIV YIELD", value: stockData?.dividentYield },
    { title: "CASH", value: stockData?.cashInM },
    { title: "PROMOTER HOLDING", value: stockData?.promoterHolding },
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
      .get(`https://localhost:7007/Stocks/GetStockById?Id=${stockId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStockData(res?.data);
      });
      axios.get("https://localhost:7007/Stocks",{headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },}).then((res)=>{
        console.log(res);
      })
  }, []);

  return (
    <div>
      <Layout />
      <div style={{ padding: "10px", backgroundColor: "#EDEBEB" }}>
        <HeaderComponent
          currentDateTime={stockData?.currentDateTime}
          bse={stockData?.bseListedName}
          nse={stockData?.nseListedName}
          currentPrice={stockData?.currentTradingPrice}
          variationPrice={stockData?.variationPrice}
          title={stockData?.companyName}
          variationPercentage={stockData?.variationPercentage}
          sector={`${stockData?.companyName} - Exploration`}
        />
        <PriceCard
          high52Rate={stockData?.high52W}
          low52Rate={stockData?.low52W}
          todaysLowRate={stockData?.todaysLow}
          todaysHighRate={stockData?.todaysHigh}
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
