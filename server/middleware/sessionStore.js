const sessionMap = new Map();

function getSession(sessionId) {
  if (!sessionMap.has(sessionId)) {
    sessionMap.set(sessionId, { parameters: {}, initialized: false });
  }
  return sessionMap.get(sessionId);
}

function clearSession(sessionId) {
  sessionMap.delete(sessionId);
}

export { getSession, clearSession };
