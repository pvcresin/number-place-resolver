import React from "react";

import { Value, Position, baseValues, defaultValues } from "./constants";
import {
  toSquarePositions,
  getSquareValues,
  getRowValues,
  getColValues,
} from "./logics";

export function CellLayout({
  children,
}: {
  children: (
    num: number,
    index: number,
    rowIndex: number,
    colIndex: number
  ) => React.ReactNode;
}) {
  return (
    <section className="layout-cell">
      {new Array(3).fill(undefined).map((_, rowIndex) => (
        <div className="layout-cell-row" key={rowIndex}>
          {new Array(3).fill(undefined).map((_, colIndex) => {
            const index = 3 * rowIndex + colIndex;
            return (
              <div className="layout-cell-column" key={colIndex}>
                {children(index + 1, index, rowIndex, colIndex)}
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}

export function Cell({
  values,
  position,
  onClick,
}: {
  values: Value[][];
  position: Position;
  onClick?: (pos: Position, value: Value) => void;
}) {
  const value = values[position.row][position.col];
  const hasValue = value !== null;

  const squareRowIndex = Math.floor(position.row / 3);
  const squareColIndex = Math.floor(position.col / 3);
  const squareValues = getSquareValues(values, squareRowIndex, squareColIndex);

  const rowValues = getRowValues(values, position.row);
  const colValues = getColValues(values, position.col);

  const usedValues = Array.from(
    new Set([...rowValues, ...colValues, ...squareValues])
  );

  const restValues = baseValues.filter((num) => !usedValues.includes(num));

  return (
    <>
      <div className="cell">
        <CellLayout>
          {(num) => {
            return (
              <div
                className="cell-value"
                style={{
                  color:
                    hasValue && value === num
                      ? "blue"
                      : !hasValue && restValues.includes(num)
                      ? "lightgray"
                      : "transparent",
                  fontWeight: value === num ? "bold" : "normal",
                }}
                onClick={() =>
                  hasValue
                    ? onClick?.(position, null)
                    : onClick?.(position, num)
                }
                key={num}
              >
                {num}
              </div>
            );
          }}
        </CellLayout>
      </div>
    </>
  );
}

// 3x3
export function CellSquare({
  values,
  positions,
  onClick,
}: {
  values: Value[][];
  positions: Position[];
  onClick?: (pos: Position, value: Value) => void;
}) {
  return (
    <div className="square">
      <CellLayout>
        {(num, index) => {
          return (
            <Cell
              values={values}
              position={positions[index]}
              onClick={onClick}
            />
          );
        }}
      </CellLayout>
    </div>
  );
}

// 9x9
export function Board() {
  const [values, setValues] = React.useState<Value[][]>(defaultValues);

  const onClick = (pos: Position, value: Value) => {
    setValues((prev) => {
      const copy = [...prev];
      copy[pos.row][pos.col] = value;
      // console.log(copy);
      return copy;
    });
  };

  return (
    <>
      <div className="board">
        <CellLayout>
          {(num, index, rowIndex, colIndex) => {
            return (
              <CellSquare
                values={values}
                positions={toSquarePositions(values, rowIndex, colIndex)}
                onClick={onClick}
              />
            );
          }}
        </CellLayout>
      </div>
    </>
  );
}
