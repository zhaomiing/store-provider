/**
 * @description 随机字符
 * @export
 * @returns
 */
export function randomKey() {
  return (Date.now() * Math.random()).toString(32).substr(0, 5);
}

/**
 * @description 格式化日期
 * @export
 * @param {any} date
 * @returns
 */
export function formatDate(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let mm = date.getMinutes();
  let s = date.getSeconds();

  if(m < 10) m = '0' + m;
  if(d < 10) d = '0' + d;
  if(h < 10) h = '0' + h;
  if(mm < 10) mm = '0' + mm;
  if(s < 10) s = '0' + s;

  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
}

/**
 * @description 获取React组件名
 * @param {any} WrappedComponent
 * @returns
 */
export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}