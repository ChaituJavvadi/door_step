import { atom, selector } from "recoil";
import users from "./mockdata/users";

export const usersState = atom({
    key: "UserList",
    default: users,
  });

  export const userState = atom({
    key: "User",
    default: null,
  });