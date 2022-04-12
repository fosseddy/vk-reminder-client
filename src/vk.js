async function login() {
	return new Promise(resolve => VK.Auth.login(resolve));
}

async function logout() {
	return new Promise(resolve => VK.Auth.logout(res => resolve(res)));
}

async function getLoginStatus() {
	return new Promise(resolve => VK.Auth.getLoginStatus(resolve));
}

async function getUserInfo(id) {
	return new Promise(resolve =>
		VK.Api.call(
			"users.get",
			{ user_ids: id, fields: "photo_100", v: "5.131" },
			resolve
		)
	);
}

export { login, logout, getLoginStatus, getUserInfo };
