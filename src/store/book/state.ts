import { Book } from "src/interfaces/book.interface";

export interface BookStateInterface {
  allBook: Book[];
  newBook?: Book;
}

function state(): BookStateInterface {
  return {
    allBook: [],
  };
}

export default state;
