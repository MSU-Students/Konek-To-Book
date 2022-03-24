import { BookFines } from "src/interfaces/book-fines.interface";

export interface BookFinestateInterface {
  allBookFines:BookFines[],
  newBookFines?:BookFines
}

function state(): BookFinestateInterface {
  return {
    allBookFines:[]
  };
}

export default state;
