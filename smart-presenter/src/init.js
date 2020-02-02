function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function getKeyIdFromUrl(key) {
  const queryString = window.location.search;
  const urlParams = queryString && new URLSearchParams(queryString) || new Map();
  return urlParams.get(key);
}

const getSessionIdFromUrl = () => getKeyIdFromUrl("sessionId");
const getUserIdFromUrl = () => getKeyIdFromUrl("userId");

export default function init() {
  const mayBeSessionId = sessionStorage.getItem("sessionId") || getSessionIdFromUrl();
  const mayBeuserId = sessionStorage.getItem("userId") || getUserIdFromUrl();

  const sessionId = mayBeSessionId || uuidv4();
  const userId = mayBeuserId || uuidv4();

  sessionStorage.setItem("sessionId", sessionId);
  sessionStorage.setItem("userId", userId);

  return { sessionId, userId }
}
