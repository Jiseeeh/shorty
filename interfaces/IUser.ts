import IShorty from "./IShorty";

export default interface IUser {
  id: string;
  name: string;
  shorties?: IShorty[];
}
