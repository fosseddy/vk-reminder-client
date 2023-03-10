import * as storage from "@/storage";

// @Todo(art): make it env dependent
const apiUrl = "http://localhost:5000/api";

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "VK-Session": storage.getSessionHeader()
    };
}

async function request(method, uri, body = null) {
    const opts = {
        method,
        headers: getHeaders()
    };
    if (body) {
        opts.body = JSON.stringify(body);
    }
    const res = await fetch(apiUrl + uri, opts);
    return res.json();
}

export const messages = {};
export const reminder = {};

messages.allowed = async function() {
    return request("GET", "/messages/check");
}

reminder.all = async function() {
    return request("GET", "/reminder");
}

reminder.one = async function(id) {
    return request("GET", `/reminder/${id}`);
}

reminder.create = async function({ message, date }) {
    return request("POST", "/reminder", { message, date });
}

reminder.update = async function(r) {
    const { id, ...body } = r;
    return request("PUT", `/reminder/${id}`, body);
}

reminder.remove = async function(id) {
    return request("DELETE", `/reminder/${id}`);
}
