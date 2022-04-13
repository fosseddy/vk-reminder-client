// @TODO(art): make it env dependent
const apiUrl = "http://localhost:5000/api";

async function areMessagesAllowed(session, userId) {
  const result = { status: -1, data: null, error: null };

  try {
    const res = await fetch(apiUrl + "/check-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ session, userId })
    });

    result.status = res.status;

    const data = await res.json();
    if (data.error) {
      result.error = data.error;
      return result;
    }

    result.data = data.data;
    return result;

  } catch (err) {
    result.error = err;
    return result;
  }
}

export { areMessagesAllowed };
