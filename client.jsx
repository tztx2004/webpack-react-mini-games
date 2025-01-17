const React = require('react');
const ReactDOM = require('react-dom/client');
// const WordRelay = require('./WordRelay');
import WordRelay from './components/WordRelay/WordRelay';
import NumberBaseball from './components/NumberBaseball/NumberBaseballClass';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <>
    <NumberBaseball />

    <WordRelay />
  </>
);
