import IShorty from "../interfaces/IShorty";

export default function syncSessionStorage(
  data: IShorty,
  mode: "add" | "delete"
) {
  let userSessionStorage: IShorty[] = [];

  const storage = sessionStorage.getItem("shorties");

  if (storage !== null) {
    let parsed: IShorty[] = JSON.parse(storage);

    if (mode === "add") parsed.push(data);
    else parsed = parsed.filter((shorty) => shorty.id !== data.id);

    sessionStorage.setItem("shorties", JSON.stringify(parsed));
    return;
  }

  userSessionStorage.push(data);
  sessionStorage.setItem("shorties", JSON.stringify(userSessionStorage));
}
