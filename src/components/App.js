import React from 'react';

import Num from './Num.js';
import Buttons from './Buttons.js';

import '../styles/App.css';

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Redux 实现原理演示</h1>
      </header>
      <Num />
      <Buttons />
    </div>
  );
}

export default App;
