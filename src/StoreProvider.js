/**
 * @description: 基于state全局可访问的store的简单实现
 * @author: zuczhao#gmail.com
 * @copyright: Dtstack. All Rights Reserved.
 * @since: 2018-01-23 16:33
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, isFunction } from 'lodash';

import { randomKey, formatDate, getDisplayName } from './utils';

/**
 * @description 类似 redux store
 * @class Store
 */
export class Store {
  constructor(reducer) {
    this.reducer = reducer;
    this.subscriptions = [];
    this.dispatch = this.dispatch.bind(this);

    this.dispatch({type: '@@STORE_INIT'});
  }

  /**
   * @description 触发action
   * @param {object/function} action
   * @memberof Store
   */
  dispatch(action) {
    // 类似redux-thunk实现
    if(isFunction(action)) {
      action(this.dispatch);
    }
    else {
      console.group(
        `%c ${action.type} %c${formatDate(new Date())}`,
        'color: green',
        'color: #999'
      );
      console.log('BEFORE: ', this.state);
      console.log('ACTION: ', action);
      this.state = this.reducer(this.state, action);
      console.log('AFTER : ', this.state);
      console.groupEnd();
      this.subscriptions.forEach(subsO => {
        subsO.cb.call()
      });
    }
  }

  /**
   * @description 订阅
   * @param {any} subsO {subsKey, cb}
   * @memberof Store
   */
  subscribe(subsO) {
    this.subscriptions.push(subsO);
  }

  /**
   * @description 取消订阅
   * @param {any} subsKey
   * @memberof Store
   */
  unsubscribe(subsKey) {
    this.subscriptions = this.subscriptions.filter(subsO => {
      return subsO.subsKey !== subsKey
    });
  }

  getState() {
    return this.state;
  }
}

/**
 * @description redux的createStore实现
 * @export
 * @param {any} reducer
 * @returns
 */
export function createStore(reducer) {
  return new Store(reducer);
}

/**
 * @description 全局分发Store
 * @export
 * @class StoreProvider
 * @extends {React.Component}
 */
export default class StoreProvider extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  getChildContext() {
    return {
      store: this.store
    }
  }

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {...this.props})
        })}
      </div>
    )
  }
}

StoreProvider.childContextTypes = {
  store: PropTypes.instanceOf(Store)
};


/**
 * @description 生成Connector, 类似Redux中的Container
 * @export
 * @param {any} WrappedComponent
 * @param {any} mapState
 * @param {any} mapDispatch
 */
export function connectHOC(WrappedComponent, mapState, mapDispatch) {
  class C extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.subsKey = randomKey();
      this.store = this.context.store;
      this.store.subscribe({
        subsKey: `${this.subsKey}`,
        cb: this.handleStoreChange.bind(this)
      });

      this.state = this.getStateProps();
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !isEqual(this.state, nextState) || !isEqual(this.props, nextState);
    }

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
      this.store.unsubscribe(this.subsKey);
    }

    /**
     * @description 获取mappedState
     * @returns
     * @memberof C
     */
    getStateProps() {
      return !mapState ? {} : {...mapState(this.store.getState())};
    }

    /**
     * @description 获取mappedDispatch
     * @returns
     * @memberof C
     */
    getDispatchProps() {
      return !mapDispatch ? {} : mapDispatch(this.store.dispatch);
    }

    handleStoreChange() {
      if(this._isMounted) {
        this.setState(this.getStateProps());
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          {...this.getDispatchProps()}
        />
      )
    }
  }

  C.displayName = `connect(${getDisplayName(WrappedComponent)})`;
  C.contextTypes = {
    store: PropTypes.instanceOf(Store)
  };

  return C;
}
