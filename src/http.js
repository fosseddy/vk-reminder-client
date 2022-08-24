import * as storage from "@/storage";

// @TODO(art): make it env dependent
const apiUrl = "http://localhost:5000/api";

function getHeaders() {
  return {
    "Content-Type": "application/json",
    "VK-Session": storage.SessionHeader.get()
  };
}

async function areMessagesAllowed() {
  const res = await fetch(apiUrl + "/messages/check", {
    method: "GET",
    headers: getHeaders()
  });

  return res.json();
}

async function getReminders() {
  const res = await fetch(apiUrl + "/reminder", {
    method: "GET",
    headers: getHeaders()
  });

  return res.json();
}

async function getReminder(id) {
  const res = await fetch(apiUrl + `/reminder/${id}`, {
    method: "GET",
    headers: getHeaders()
  });

  return res.json();
}

async function createReminder({ text, date }) {
  const res = await fetch(apiUrl + "/reminder", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ text, date })
  });

  return res.json();
}

async function removeReminder(id) {
  const res = await fetch(apiUrl + `/reminder/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });

  return res.json();
}

async function updateReminder(r) {
  const { _id, ...body } = r;
  const res = await fetch(apiUrl + `/reminder/${_id}`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify(body)
  });

  return res.json();
}

export {
  areMessagesAllowed,
  getReminders,
  createReminder,
  removeReminder,
  updateReminder
};
