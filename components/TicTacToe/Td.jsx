import React, { memo, useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  const onClickId = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return (
    <>
      <td onClick={onClickId}>{cellData}</td>
    </>
  );
});

export default Td;
