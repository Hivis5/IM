import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const TableContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  color: black;
`;

const TableHeader = styled.th`
  font-size: small;
  text-align: left;
  color: #969595;
  border-bottom: 2px solid #ddd;
  padding: 12px;
  width: 10rem;
`;

const TableRow = styled.tr`
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 12px;
`;
const EditButton = styled.button`
  border: none;
  background: none;
  font-weight: 700;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: small;
  cursor: pointer;
`;

const InventoryTable = () => {
  const [rowData, setRowData] = useState({
    region: "",
    country: "",
    currency: "",
    callingCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { locations } = useSelector((state) => state.location);
  const handleEdit = (index) => {
    console.log("Edit button clicked for index:", index);
  };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Region</TableHeader>
            <TableHeader>Country</TableHeader>
            <TableHeader>Currency</TableHeader>
            <TableHeader>Calling Code</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {locations.map((location, index) => (
            <TableRow key={index}>
              <TableCell>{location.countryRegion}</TableCell>
              <TableCell>{location.countryName}</TableCell>
              <TableCell>{location.currency}</TableCell>
              <TableCell>{location.callingCode}</TableCell>
              <TableCell>
                <EditButton onClick={() => handleEdit(index)}>Edit</EditButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
