function insertLog(state, payload) {
  const { log: { index } } = state;
  const { content, type } = payload;
  const log = { index, content, type };
  state.log.index = index + 1;

  if (state.log.list.length > 50) {
    state.log.list.unshift();
  }
  state.log.list.push(log);
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
