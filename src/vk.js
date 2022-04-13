VK.Auth.loginAsync = async function() {
  return new Promise(resolve => VK.Auth.login(resolve));
}

VK.Auth.logoutAsync = async function() {
  return new Promise(resolve => VK.Auth.logout(resolve));
}

VK.Auth.getLoginStatusAsync = async function() {
  return new Promise(resolve => VK.Auth.getLoginStatus(resolve));
}

VK.Api.getUserInfo = async function(id) {
  return new Promise(resolve =>
    VK.Api.call(
      "users.get",
      // @TODO(art): get vk api version from server?
      { user_ids: id, fields: "photo_100", v: "5.131" },
      resolve
    )
  );
}
