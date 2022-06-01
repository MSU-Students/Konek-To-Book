import issuedbookService from "src/services/issued-book.service";
import { BookFinesDto } from "src/services/rest-api";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { IssuedBookStateInterface } from "./state";

const actions: ActionTree<IssuedBookStateInterface, StateInterface> = {
  async addIssuedBook(context, payload: any): Promise<any> {
    const result = await issuedbookService.create(payload);
    context.commit("setNewIssuedBook", result);
    await context.dispatch("getAllIssuedBook");
  },

  async editIssuedBook(context, payload: any): Promise<any> {
    const result = await issuedbookService.update(
      payload.IssuedBook_ID,
      payload
    );
    context.commit("updateIssuedBook", payload);
    await context.dispatch("getAllIssuedBook");
    await this.dispatch("bookfines/getAllBookFines");
  },

  async deleteIssuedBook(context, IssuedBook_ID: number): Promise<any> {
    const result = await issuedbookService.delete(IssuedBook_ID);
    context.commit("deleteIssuedBook", result);
    await context.dispatch("getAllIssuedBook");
  },

  async getAllIssuedBook(context): Promise<any> {
    const res = await issuedbookService.getAll();
    context.commit("getAllIssuedBook", res);
    await this.dispatch("book/getAllBook");
    await this.dispatch("borrower/getAllBorrower");
    const dateNow = new Date();
    context.state.allIssuedBook.forEach((book) => {
      const parseDate = /^(?<Year>\d{4})-(?<Month>\d{2})-(?<Date>\d{2})$/.exec(
        book.Due_Date
      );
      const dueDate: Date = new Date(
        Number(parseDate?.groups?.Year),
        Number(parseDate?.groups?.Month) - 1,
        Number(parseDate?.groups?.Date)
      );

      if (dueDate < dateNow) {
        if (!book.fines && !/^(Return)$/gi.test(book.IssuedBook_Status)) {
          // add book into fines
          this.dispatch("bookfines/addBookFines", {
            Title: book.Title,
            Borrower_Name: book.Borrower_Name,
            Fine_Date: book.Due_Date,
            Payment_Amount: "5",
            Payment_Status: "Fines",
          } as BookFinesDto);
          // delete issued books
          this.dispatch("issuedbook/deleteIssuedBook", book.IssuedBook_ID);
        } else {
          const bookFines = book.fines;
          const diff = new Date(dueDate.getTime() - dateNow.getTime());
          const SECONDS = 1000;
          const MINUTES = 60 * SECONDS;
          const HOUR = 60 * MINUTES;
          const DAY = 24 * HOUR;
          const days = Math.fround(diff.getTime() / DAY);
          this.dispatch("bookfines/editBookFines", {
            ...bookFines,
            Payment_Amount: String(5 * days),
          });
        }
      }
    });
    await this.dispatch("bookfines/getAllBookFines");
  },

  async getOneIssuedBook(context, IssuedBook_ID: number): Promise<any> {
    const res = await issuedbookService.getOne(IssuedBook_ID);
    context.commit("getOneIssuedBook", res);
  },
};

export default actions;
