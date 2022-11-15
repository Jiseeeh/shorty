import IShorty from "../interfaces/IShorty";

/**
 * It takes in a data object and a mode string, and then it either adds the data object to the session
 * storage or deletes it from the session storage.
 * @param {IShorty} data - IShorty - this is the data that you want to add to the session storage
 * @param {"add" | "delete"} mode - "add" | "delete"
 * @returns Nothing.
 */
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
