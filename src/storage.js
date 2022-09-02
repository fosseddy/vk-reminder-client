const Key = {
  UserId: "vk-user-id",
  SessionHeader: "vk-session-header"
};

function get(key) {
  return localStorage.getItem(key);
}

function set(key, value) {
  localStorage.setItem(key, value);
}

function remove(key) {
  localStorage.remove(key);
}

export function getUserId() {
  return get(Key.UserId);
}

export function setUserId(val) {
  return set(Key.UserId, val);
}

export function removeUserId() {
  return remove(Key.UserId);
}

export function getSessionHeader() {
  return get(Key.SessionHeader);
}

export function setSessionHeader(opts) {
  const val =  Object.entries(opts).map(kv => kv.join("=")).join("&");
  return set(Key.SessionHeader, val);
}

export function removeSessionHeader() {
  return remove(Key.SessionHeader);
}
