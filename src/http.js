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

export {
  areMessagesAllowed,
  getReminders
};
