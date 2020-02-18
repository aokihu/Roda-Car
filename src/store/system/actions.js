let DEV_CLICK_TIMER;
// 点击进入开发模式的组建
// 当用户点击的时候将会自动增加计数器
export function clickDevWidget({ state, commit }) {
  const { devmode: { clickCount } } = state;

  // 点击数达到5则打开开发模式
  if (clickCount >= 5) {
    commit('enableDevMode');
    if (DEV_CLICK_TIMER) clearTimeout(DEV_CLICK_TIMER);
    return false;
  }

  // 否则就继续监听点击
  commit('addDevClickCount');

  if (DEV_CLICK_TIMER) {
    clearTimeout(DEV_CLICK_TIMER);
  }

  // 超时1秒后自动重制点击计数器
  DEV_CLICK_TIMER = setTimeout(() => {
    commit('clearDevClickCount');
  }, 1000);

  return true;
}
