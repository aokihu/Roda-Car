function insertLog(state, payload) {
  const { log: { index } } = state;
  const { content, type } = payload;
  const log = { index, content, type };
  state.log.index = index + 1;

  if (state.log.list.length > 50) {
    state.log.list.pop();
  }
  state.log.list.unshift(log);
}

// 添加Log日志消息
export function
addLog(state, payload) {
  insertLog(state, { content: payload, type: 0 });
}

// 添加成功的日志
export function
addSuccessLog(state, payload) {
  insertLog(state, { content: payload, type: 1 });
}

// 添加错误的日志
export function
addFailLog(state, payload) {
  insertLog(state, { content: payload, type: 2 });
}

// 添加警告的日志
export function
addWarnLog(state, payload) {
  insertLog(state, { content: payload, type: 3 });
}

/** ***************************** */

export function addDevClickCount(state) {
  const { devmode: { clickCount } } = state;
  if (clickCount < 5) { state.devmode.clickCount += 1; }
}

export function clearDevClickCount(state) {
  state.devmode.clickCount = 0;
  state.devmode.enable = false;
}

export function enableDevMode(state) {
  state.devmode.enable = true;
  state.devmode.clickCount = 0;
}

export function disableDevMode(state) { state.devmode.enable = false; }
export function setDevMode(state, mode) { state.devmode.enable = mode; }
export function toggleLogShowed(state) { state.devmode.logShowed = !state.devmode.logShowed; }

/** **************************** */

// 设置目标的ID
export function
setDestId(state, id) {
  state.settings.destId = id;
}


// P2P连接
export function p2pConnected(state) { state.p2p.isConnected = true; }

// P2P断开连接
export function p2pDisconnected(state) { state.p2p.isConnected = false; }
