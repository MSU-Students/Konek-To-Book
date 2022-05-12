import { BookFines } from './book-fines.interface';
export interface IssuedBook {
  IssuedBook_ID?: number;
  Title: string;
  Borrow_Date: string;
  Due_Date: string;
  Book_Status: string;
  Borrower_Name: string;
  IssuedBook_Status: string;
  fines?: BookFines;
}
