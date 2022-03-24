import { Borrower } from "src/interfaces/borrower.interface";

export interface BorrowerStateInterface {
  allBorrower: Borrower[];
  newBorrower?: Borrower;
}

function state(): BorrowerStateInterface {
  return {
    allBorrower: [],
  };
}

export default state;
