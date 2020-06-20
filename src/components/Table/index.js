import React from "react";
import "./Table.css";
import PropTypes from "prop-types";
import { StickyTable, Row as TableRow, Cell } from "react-sticky-table";

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
          item[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <>
      <StickyTable>
        <TableRow className="header" style={{}}>
          {columnHeaders.map((column, i) => (
            <Cell key={i}>{column}</Cell>
          ))}
        </TableRow>

        {filteredData.map((country, index) => (
          <TableRow key={index} className={index % 2 === 0 ? "odd" : "even"}>
            {columns.map((name, i) => (
              <Cell key={i}> {country[name]}</Cell>
            ))}
          </TableRow>
        ))}
      </StickyTable>
    </>
  );
};

DataTable.propTypes = {
  rows: PropTypes.array,
};
export default DataTable;
