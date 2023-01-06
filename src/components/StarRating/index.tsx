import React from "react";
import Box from "@mui/material/Box";
import "./index.css";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import RatingComponent from "../RatingComponent";
import InfoComponent from "../IconComponent/index";
import { Card, Rating, Typography } from "@mui/material";

type StarRatingCardProps = {
  ratingValue: number;
  totalCount: number;
  maxStarCount: number;
  totalReviews:{tagName:string,title:string,rating:number}[];
  finStarRating: number;
};

const StarRating = (props: StarRatingCardProps) => {
  const { ratingValue, totalCount, maxStarCount,totalReviews,finStarRating } = props;
  return (
    <>
      <Card style={{ padding: "20px",marginTop:'25px',marginRight:"25px" }}>
        <Grid container spacing={2} lg={12}>
          <Grid item lg={4}>
            <Grid container lg={12}>
              <Typography variant="h6" gutterBottom fontWeight={"bold"}>
                Finstar
              </Typography>
              <span style={{ paddingTop: "8px" }}>
                <InfoIcon className="infoIcon" />
              </span>
            </Grid>
            <Grid container lg={12}>
              <RatingComponent rating={finStarRating} totalStarCount={5} size="large" />

              <Grid container lg={12}>
                <Typography className="rating">{finStarRating}</Typography>
                <span className="totalCount">(44)</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8}>
            <Grid container lg={12}>
              {totalReviews?.map((item) => (
                <>
                  <Grid className="ratingGrid" item lg={5.5}>
                    <span className="ratingTopic">{item.tagName}</span>
                    <Card className="ratingContent">
                      {item.title} <InfoComponent />{" "}
                      <RatingComponent
                        size="small"
                        rating={item.rating}
                        totalStarCount={1}
                      />
                      <span className="rating">{item?.rating}</span>
                      <span className="totalCount">(90)</span>
                    </Card>
                  </Grid>
                  <Grid item lg={0.5}></Grid>
                </>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
export default StarRating;
