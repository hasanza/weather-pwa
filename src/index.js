//this file connects our app to the index html in root/public folder
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//ReactDOM will render the App component inside the root div in the index.html
ReactDOM.render(<App/>, document.getElementById('root'));
