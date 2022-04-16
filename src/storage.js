const StorageItem = { key: null };

StorageItem.get = function() {
  return localStorage.getItem(this.key);
}

StorageItem.set = function(val) {
  localStorage.setItem(this.key, val);
}

StorageItem.remove = function() {
  localStorage.removeItem(this.key);
}

function createStorageItem(key) {
  return Object.create(StorageItem, {
    key: { value: key }
  });
}

const UserId = createStorageItem("vk-user-id");

const SessionHeader = createStorageItem("vk-session-header");
SessionHeader.set = function(opts) {
  localStorage.setItem(
    this.key,
    Object.entries(opts).map(kv => kv.join("=")).join("&")
  );
}

export {
  UserId,
  SessionHeader
};
