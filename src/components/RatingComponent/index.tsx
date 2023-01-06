import React from "react";
import Rating from "@mui/material/Rating";

type RatingComponentProps = {
  rating: number;
  size: "small" | "medium" | "large" | undefined;
  totalStarCount: number;
};
const RatingComponent: React.FC<RatingComponentProps> = (
  props: RatingComponentProps
) => {
  const { rating, size, totalStarCount } = props;

  return (
    <>
      <Rating
        name="read-only"
        readOnly
        value={rating}
        size={size}
        max={totalStarCount}
      />
    </>
  );
};
export default RatingComponent;
