import React from 'react';
import { connectHOC } from '../utils/StoreProvider';

function Num(props) {
	return <div className="num">{props.num}</div>
}

export default connectHOC(Num, state => ({
	num: state.num
}));
