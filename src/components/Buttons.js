import React from 'react';
import { connectHOC } from '../utils/StoreProvider';

import { asyncAdd } from "../actions";

function Buttons(props) {
  const { add, minus, async } = props;
	return (
		<p className="buttons">
      <button onClick={add}>+</button>
      <button onClick={minus}>-</button>
      <button onClick={async}>async</button>
    </p>
	);
}

const mapState = state => ({});

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

export default connectHOC(Buttons, mapState, mapDispatch);