import * as storage from "@/storage";

// @TODO(art): make it env dependent
const apiUrl = "http://localhost:5000/api";

async function areMessagesAllowed() {
  const res = await fetch(apiUrl + "/messages/check", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "VK-Session": storage.SessionHeader.get()
    }
  });

  return res.json();
}

export {
  areMessagesAllowed
};
