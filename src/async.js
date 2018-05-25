/**
 * @description 模拟异步请求
 * @param {any} dispatch
 */
export const asyncAdd = (dispatch) => {
  setTimeout(function() {
    dispatch({
      type: 'ADD'
    })
  }, 3000);
};
