import { Author } from "src/interfaces/author.interface";

export interface AuthorStateInterface {
  allAuthor:Author[],
  newAuthor?:Author
}

function state(): AuthorStateInterface {
  return {
    allAuthor:[],
  };
}

export default state;
