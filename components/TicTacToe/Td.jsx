import React, { memo, useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickId = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return (
    <>
      <td onClick={onClickId} style={{ fontSize: '24px' }}>
        {cellData}
      </td>
    </>
  );
});

export default Td;
