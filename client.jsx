const React = require('react');
const ReactDOM = require('react-dom/client');

import { BrowserRouter, Link, Route, Routes } from 'react-router';

// components
import WordRelay from './components/WordRelay/WordRelay';
import NumberBaseball from './components/NumberBaseball/NumberBaseball';
import ResponseCheck from './components/ResponseCheck/ResponseCheck';
import RSPClass from './components/RSP/RSPClass';
import TicTacToe from './components/TicTacToe/TicTacToe';
import MineSearch from './components/MineSearch/MineSearch';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <BrowserRouter>
    <div>
      <Link to='/'>홈</Link>
      <Link to='/mine-search'>지뢰찾기</Link>
      <Link to='/tic-tac-toe'>틱택토</Link>
      <Link to='/response-check'>반응속도 게임</Link>
      <Link to='/rsp'>가위바위보</Link>
      <Link to='/number-baseball'>숫자야구</Link>
      <Link to='/word-relay'>끝말잇기</Link>
    </div>

    <Routes>
      <Route path='/mine-search' Component={MineSearch} />
      <Route path='/tic-tac-toe' Component={TicTacToe} />
      <Route path='/response-check' Component={ResponseCheck} />
      <Route path='/rsp' Component={RSPClass} />
      <Route path='/number-baseball' Component={NumberBaseball} />
      <Route path='/word-relay' Component={WordRelay} />
    </Routes>
  </BrowserRouter>
);
