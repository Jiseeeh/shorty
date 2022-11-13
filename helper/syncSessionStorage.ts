export default function syncSessionStorage(data: object) {
  let userSessionStorage: object[] = [];

  const storage = sessionStorage.getItem("shorties");

  if (storage !== null) {
    let parsed = JSON.parse(storage);
    parsed.push(data);
    sessionStorage.setItem("shorties", JSON.stringify(parsed));
    return;
  }

  userSessionStorage.push(data);
  sessionStorage.setItem("shorties", JSON.stringify(userSessionStorage));
}
