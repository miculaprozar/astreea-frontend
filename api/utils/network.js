import axios from "axios";

export async function sendGetRequest(url, token, config) {
  const conf = {
    timeout: 3000,
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    },
  };

  try {
    return await axios.get(url, conf);
  } catch (e) {
    throw e;
  }
}

export async function sendPostRequest(url, body, token, config) {
  const conf = {
    timeout: 3000,
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    },
  };
  try {
    return await axios.post(url, body, conf);
  } catch (e) {
    throw e;
  }
}

export async function sendPutRequest(url, body, token, config) {
  const conf = {
    timeout: 3000,
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    },
  };
  try {
    return await axios.put(url, body, conf);
  } catch (e) {
    throw e;
  }
}
