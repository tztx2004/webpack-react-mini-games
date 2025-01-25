import React from 'react';
import Tr from './Tr';

const Table = ({ onClick, tableData, dispatch }) => {
  return (
    <table onClick={onClick}>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr
              key={`${tr}-${i}`}
              rowData={tableData[i]}
              rowIndex={i}
              dispatch={dispatch}
            />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
