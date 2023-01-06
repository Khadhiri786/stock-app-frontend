import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
} from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import "./index.css";
import InfoComponent from "../IconComponent/index";

type TableComponentProps = {
  title: string;
  list: { title: string; value: string }[];
};

const TableComponent: React.FC<TableComponentProps> = (
  props: TableComponentProps
) => {
  const { title, list } = props;

  return (
    <>
      <Card variant="outlined" style={{ marginTop: "25px" }}>
        <TableContainer style={{ padding: "10px" }}>
          <Table>
            <TableHead style={{ height: "50px" }}>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={"bold"} gutterBottom>
                    {title}
                  </Typography>
                </TableCell>
                <TableCell>{""}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ margin: "3px" }}>
              {list?.map((item) => (
                <TableRow key={2} style={{ height: "58px" }}>
                  <TableCell component="th" scope="row">
                    {item?.title} <InfoComponent />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item?.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};
export default TableComponent;
