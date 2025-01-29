import React, { useState } from 'react';
import * as ReactDOM from 'react-dom/client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { BrowserRouter, Link, Route, Routes } from 'react-router';

// components
import WordRelay from './components/WordRelay/WordRelay';
import NumberBaseball from './components/NumberBaseball/NumberBaseball';
import ResponseCheck from './components/ResponseCheck/ResponseCheck';
import RSPClass from './components/RSP/RSPClass';
import TicTacToe from './components/TicTacToe/TicTacToe';
import MineSearch from './components/MineSearch/MineSearch';
import Gnb from './fixtures/Gnb';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <>
    <BrowserRouter>
      <BoxComponent />

      <Routes>
        <Route path='/mine-search' Component={MineSearch} />
        <Route path='/tic-tac-toe' Component={TicTacToe} />
        <Route path='/response-check' Component={ResponseCheck} />
        <Route path='/rsp' Component={RSPClass} />
        <Route path='/number-baseball' Component={NumberBaseball} />
        <Route path='/word-relay' Component={WordRelay} />
      </Routes>
    </BrowserRouter>
  </>
);

// 현재 url이 Gnb value와 일치하는지 검증
const checkCurrentPath = () => {
  return Gnb.filter((x) => x.path === location.pathname)[0].value;
};

function BoxComponent() {
  const [num, setNum] = useState(checkCurrentPath());

  const onClick = (value) => {
    setNum(value);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs aria-label='basic tabs example' value={num}>
        {Gnb.map((page) => {
          return (
            <Tab
              key={page.value}
              label={page.name}
              value={page.value}
              LinkComponent={Link}
              to={page.path}
              onClick={() => onClick(page.value)}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
