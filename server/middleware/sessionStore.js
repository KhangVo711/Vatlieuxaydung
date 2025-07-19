// Giả lập lưu session trên bộ nhớ (có thể chuyển sang Redis hoặc DB)
const sessionStore = {};

function getSession(sessionId) {
  if (!sessionStore[sessionId]) {
    sessionStore[sessionId] = {
      parameters: {}
    };
  }
  return sessionStore[sessionId];
}

function clearSession(sessionId) {
  sessionStore[sessionId] = { parameters: {} };
}

export { getSession, clearSession };
