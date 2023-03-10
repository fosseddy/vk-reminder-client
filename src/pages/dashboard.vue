<script>
import VKAllowMessages from "@/components/vk-allow-messages.vue";
import DatetimePicker from "@/components/datetime-picker.vue";
import * as http from "@/http";
import * as storage from "@/storage";

export default {
    components: { VKAllowMessages, DatetimePicker },

    data() {
        return {
            reminders: [],
            text: "",
            date: new Date(),
            loading: false
        };
    },

    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },

    methods: {
        async logout() {
            await VK.Auth.logoutAsync();
            storage.clear();
            await this.$router.push("/");
            this.$store.commit("auth/setUser", null);
        },

        async addReminder() {
            if (!this.text || !this.date) return;

            let err = null;
            const res = await http.reminder.create({
                message: this.text,
                date: this.date.setSeconds(0)
            }).catch(e => err = e);

            // @Todo(art): handle error
            if (err) {
                return console.error(err);
            }

            // @Todo(art): handle error
            if (res.error) {
                return console.error(res.error);
            }

            this.reminders.unshift(res.data);

            this.text = "";
            this.date = new Date();
        },

        async removeReminder(id) {
            let err = null;
            const res = await http.reminder.remove(id).catch(e => err = e);

            // @Todo(art): handle error
            if (err) {
                return console.error(err);
            }

            // @Todo(art): handle error
            if (res.error) {
                return console.error(res.error);
            }

            this.reminders = this.reminders.filter(r => r.id !== id);
        }
    },

    async created() {
        let err = null;
        const res = await http.reminder.all().catch(e => err = e);

        // @Todo(art): handle error
        if (err) {
            return console.error(err);
        }

        // @Todo(art): handle error
        if (res.error) {
            return console.error(res.error);
        }

        this.reminders = res.data.items.reverse();
    }
};
</script>

<template>
    <div>
        <h1>This is Dashboard Page</h1>

        <img :src="user.avatar" />
        <p>{{ user.firstname }} {{ user.lastname }}</p>

        <button @click="logout">Logout</button>
        <br /><br />

        <!-- @Todo(art): move this to settings page? -->
        <VKAllowMessages @deny="logout" />

        <h2>Reminders</h2>

        <form @submit.prevent="addReminder">
            <input type="text" v-model="text" />
            <DatetimePicker :selected="date" @change="d => date = d" />
            <button type="submit">Add</button>
        </form>

        <ul>
            <li v-for="r in reminders"
                @click="removeReminder(r.id)"
                :class="{ done: r.is_done }"
            >
                {{ r.message }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.done {
    text-decoration: line-through;
}
</style>
