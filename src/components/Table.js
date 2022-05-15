import React, { useState, useEffect } from "react";
import "./Table.css";

const TABLE_SIZE = 4;
const DEFAULT_ROW_VALUES = Array(TABLE_SIZE).fill("?");
const DEFAULT_TABLE_VALUES = Array(TABLE_SIZE).fill(DEFAULT_ROW_VALUES);

const Table = ({ tableValues }) => {
  const [cellValues, setCellValues] = useState(DEFAULT_TABLE_VALUES);
  const [generatedValues, setGeneratedValues] = useState([]);
  useEffect(() => {
    const visibleValues = Array(TABLE_SIZE).fill("?");
    const visValues = Array(TABLE_SIZE).fill(visibleValues);
    let randomValues = [];
    for (let i = 0; i < TABLE_SIZE; i++) {
      let randomRowValues = [];
      for (let j = 0; j < TABLE_SIZE; j++) {
        randomRowValues.push(
          tableValues[Math.floor(Math.random() * tableValues.length)]
        );
      }
      randomValues.push(randomRowValues);
    }
    setCellValues(DEFAULT_TABLE_VALUES);
    setGeneratedValues(randomValues);
  }, [tableValues]);

  const createColumns = (rowIndex) => {
    let cols = [];
    for (let i = 0; i < TABLE_SIZE; i++) {
      cols.push(<td key={i}>{cellValues[rowIndex][i]}</td>);
    }
    return cols;
  };
  const createRows = () => {
    let rows = [];
    for (let i = 0; i < TABLE_SIZE; i++) {
      rows.push(<tr key={i}>{createColumns(i)}</tr>);
    }
    return rows;
  };
  const handleClick = (e) => {
    // let updatedCellValues = [...cellValues];
    var updatedCellValues = [];

    for (var i = 0; i < cellValues.length; i++) {
      updatedCellValues[i] = cellValues[i].slice();
    }
    // let updatedCellValues = cellValues;
    let currentRow = e.target.parentElement.rowIndex;
    let currentCell = e.target.cellIndex;
    updatedCellValues[currentRow][currentCell] =
      generatedValues[currentRow][currentCell];
    setCellValues(updatedCellValues);
  };

  const rows = createRows();
  return (
    <table onClick={(e) => handleClick(e)}>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
