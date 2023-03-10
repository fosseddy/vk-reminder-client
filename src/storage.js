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
    localStorage.removeItem(key);
}

export function clear() {
    for (const k of Object.values(Key)) {
        remove(k);
    }
}

export function getUserId() {
    return get(Key.UserId);
}

export function setUserId(val) {
    set(Key.UserId, val);
}

export function removeUserId() {
    remove(Key.UserId);
}

export function getSessionHeader() {
    return get(Key.SessionHeader);
}

export function setSessionHeader(opts) {
    const val = Object.entries(opts).map(kv => kv.join("=")).join("&");
    set(Key.SessionHeader, val);
}

export function removeSessionHeader() {
    remove(Key.SessionHeader);
}
