import { Users } from "src/interfaces/users.interface";

export interface AccountStateInterface {
  allAccount: Users[];
  newAccount?: Users;
}

function state(): AccountStateInterface {
  return {
    allAccount: [
    ],
  };
}

export default state;
