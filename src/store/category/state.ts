import { Category } from "src/interfaces/category.interface";

export interface CategoryStateInterface {
  allCategory: Category[];
  newCategory?: Category;
}

function state(): CategoryStateInterface {
  return {
    allCategory: [],
  };
}

export default state;
