import React from "react";
import "./index.css";

type TagComponentProps = {
  value: string;
  bgColor?: string;
};
const TagComponent = (props: TagComponentProps) => {
  return (
    <>
      <label
        className="tag"
        style={{ backgroundColor: `${props?.bgColor}` || "#b9dd4E" }}
      >
        {props?.value}
      </label>
    </>
  );
};
export default TagComponent;
