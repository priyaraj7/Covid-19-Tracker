import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

const DataTable = ({ rows, searchTerm, columns, searchColumn }) => {
  const columnHeaders = [
    "Name",
    "Cases",
    "Active",
    "Recovered",
    "Deaths",
    "NewCases",
    "NewDeaths",
  ];

  const filteredData =
    searchTerm === ""
      ? rows
      : rows.filter((item) =>
          item[searchColumn].toLowerCase().includes(searchTerm)
        );
  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columnHeaders.map((column, i) => (
              <th key={i}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((country, index) => (
            <tr key={index}>
              {columns.map((name) => (
                <td>{country[name]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>{" "}
    </>
  );
};

DataTable.propTypes = {
  rows: PropTypes.object,
};
export default DataTable;
