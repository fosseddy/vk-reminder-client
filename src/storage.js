const StorageItem = { key: null };

StorageItem.create = function(key) {
  return Object.create(StorageItem, {
    key: { value: key }
  });
}

StorageItem.get = function() {
  return localStorage.getItem(this.key);
}

StorageItem.set = function(val) {
  localStorage.setItem(this.key, val);
}

StorageItem.remove = function() {
  localStorage.removeItem(this.key);
}

const UserId = StorageItem.create("vk-user-id");

const SessionHeader = StorageItem.create("vk-session-header");
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
