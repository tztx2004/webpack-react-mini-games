import React, { useCallback, useState, useContext, memo } from 'react';
import { START_GAME, TableContext } from './MineSearch';
import Inputs from '../../common/Components/Inputs/Inputs';
import { Box, Button } from '@mui/material';

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);

  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);
  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <Inputs
        type='number'
        placeholder='세로'
        value={row}
        onChange={onChangeRow}
      />
      <Inputs
        type='number'
        placeholder='가로'
        value={cell}
        onChange={onChangeCell}
      />
      <Inputs
        type='number'
        placeholder='지뢰'
        value={mine}
        onChange={onChangeMine}
      />

      <Button onClick={onClickBtn}>시작</Button>
    </Box>
  );
});

export default Form;
