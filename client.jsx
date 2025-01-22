const React = require('react');
const ReactDOM = require('react-dom/client');

// components
import WordRelay from './components/WordRelay/WordRelay';
import NumberBaseball from './components/NumberBaseball/NumberBaseball';
import ResponseCheck from './components/ResponseCheck/ResponseCheck';
import RSPClass from './components/RSP/RSPClass';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <>
    {/* <RSPClass /> */}

    <ResponseCheck />

    <NumberBaseball />

    <WordRelay />
  </>
);
