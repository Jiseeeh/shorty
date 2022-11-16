/**
 * Create a string of random characters from a predefined set of characters, and return the string.
 * @returns A string of 8 random characters.
 */
export default function randomize() {
  const length = 8;
  let random = "";
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  for (let i = 0; i < length; i++) {
    random += characters[Math.floor(Math.random() * characters.length)];
  }

  return random;
}
