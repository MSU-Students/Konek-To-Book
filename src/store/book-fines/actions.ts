import bookfinesService from "src/services/book-fines.service";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { BookFinestateInterface } from "./state";

const actions: ActionTree<BookFinestateInterface, StateInterface> = {
  async addBookFines(context, payload: any): Promise<any> {
    const result = await bookfinesService.create(payload);
    context.commit("setNewBookFines", result);
    await context.dispatch("getAllBookFines");
  },

  async editBookFines(context, payload: any): Promise<any> {
    const result = await bookfinesService.update(payload.BookFines_ID, payload);
    context.commit("updateBookFines", payload);
    await context.dispatch("getAllBookFines");
  },

  async deleteBookFines(context, BookFines_ID: number): Promise<any> {
    const result = await bookfinesService.delete(BookFines_ID);
    context.commit("deleteBookFines", result);
    await context.dispatch("getAllBookFines");
  },

  async getAllBookFines(context): Promise<any> {
    const res = await bookfinesService.getAll();
    context.commit("getAllBookFines", res);
    await this.dispatch("borrower/getAllBorrower");
    await this.dispatch("book/getAllBook");
  },

  async getOneBookFines(context, BookFines_ID: number): Promise<any> {
    const res = await bookfinesService.getOne(BookFines_ID);
    context.commit("getOneBookFines", res);
  },
};

export default actions;
