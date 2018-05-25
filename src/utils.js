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
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const mm = date.getMinutes();
  const s = date.getSeconds();

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