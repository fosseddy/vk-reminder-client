<script>
export default {
	data() {
		return {
		};
	},

	computed: {
	},

	methods: {
	},
	
	created() {
		VK.Observer.subscribe(
			"widgets.allowMessagesFromCommunity.allowed",
			id => {
				console.log(id, "allowed");
			}
		);

		VK.Observer.subscribe(
			"widgets.allowMessagesFromCommunity.denied",
			id => {
				console.log(id, "denied");
			}
		);

		VK.Widgets.AllowMessagesFromCommunity(
			"vk_send_message",
			{ height: 30 },
			202435034
		);
	},

	unmounted() {
		VK.Observer.unsubscribe("widgets.allowMessagesFromCommunity.allowed");
		VK.Observer.unsubscribe("widgets.allowMessagesFromCommunity.denied");
	}
};
</script>

<template>
<div>
	<h1>This is Allow Messages Page</h1>
	<div id="vk_send_message"></div>
</div>
</template>
