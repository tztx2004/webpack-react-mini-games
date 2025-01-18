const React = require('react');
const ReactDOM = require('react-dom/client');

// components
import WordRelay from './components/WordRelay/WordRelay';
import NumberBaseball from './components/NumberBaseball/NumberBaseball';
import ResponseCheckClass from './components/ResponseCheck/ResponseCheckClass';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <>
    <ResponseCheckClass />

    <NumberBaseball />

    <WordRelay />
  </>
);
