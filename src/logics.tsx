import { Value } from "./constants";

export function toSquarePositions(
  value: Value[][],
  rowIndex: number,
  colIndex: number
) {
  const positions = [];

  positions.push({ row: rowIndex * 3 + 0, col: colIndex * 3 + 0 });
  positions.push({ row: rowIndex * 3 + 0, col: colIndex * 3 + 1 });
  positions.push({ row: rowIndex * 3 + 0, col: colIndex * 3 + 2 });

  positions.push({ row: rowIndex * 3 + 1, col: colIndex * 3 + 0 });
  positions.push({ row: rowIndex * 3 + 1, col: colIndex * 3 + 1 });
  positions.push({ row: rowIndex * 3 + 1, col: colIndex * 3 + 2 });

  positions.push({ row: rowIndex * 3 + 2, col: colIndex * 3 + 0 });
  positions.push({ row: rowIndex * 3 + 2, col: colIndex * 3 + 1 });
  positions.push({ row: rowIndex * 3 + 2, col: colIndex * 3 + 2 });

  return positions;
}

export function toSquareValues(
  values: Value[][],
  rowIndex: number,
  colIndex: number
) {
  return [
    ...values[rowIndex * 3].slice(colIndex * 3, colIndex * 3 + 3),
    ...values[rowIndex * 3 + 1].slice(colIndex * 3, colIndex * 3 + 3),
    ...values[rowIndex * 3 + 2].slice(colIndex * 3, colIndex * 3 + 3),
  ];
}

export function getSquareValues(
  values: Value[][],
  rowIndex: number,
  colIndex: number
) {
  const squareValues = toSquareValues(values, rowIndex, colIndex);
  return squareValues;
}

export function getRowValues(values: Value[][], rowIndex: number) {
  const rowValues = values[rowIndex];
  return rowValues;
}

export function getColValues(values: Value[][], colIndex: number) {
  const colValues = values.map((row) => row[colIndex]);
  return colValues;
}
