import React, { Component } from 'react';
import { connectHOC } from './StoreProvider';

import { asyncAdd } from "./async";

import './App.css';

class App extends Component {
  render() {
    const { num, add, minus, async } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Redux 实现原理演示</h1>
        </header>
        <p className="buttons">
          <button onClick={add}>+</button>
          <button onClick={minus}>-</button>
          <button onClick={async}>async</button>
        </p>
        <p>当前计数：{num}</p>
      </div>
    );
  }
}

const mapState = state => ({
    num: state.num
});
const mapDispatch = dispatch => ({
  add() {
    dispatch({
      type: 'ADD'
    })
  },
  minus() {
    dispatch({
      type: 'MINUS'
    })
  },
  async() {
    dispatch(asyncAdd)
  }
});

export default connectHOC(App, mapState, mapDispatch);
