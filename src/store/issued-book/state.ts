import { IssuedBook } from "src/interfaces/issued-book.interface";

export interface IssuedBookStateInterface {
  allIssuedBook:IssuedBook[],
  newIssuedBook?:IssuedBook
}

function state(): IssuedBookStateInterface {
  return {
    allIssuedBook:[]
  };
}

export default state;
