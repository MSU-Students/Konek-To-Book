import { BookFinesDto } from "src/services/rest-api";
import { MutationTree } from "vuex";
import { BookFinestateInterface } from "./state";

const mutation: MutationTree<BookFinestateInterface> = {
  setNewBookFines(state, payload) {
    state.newBookFines = payload;
  },
  updateBookFines(state, payload) {
    state.newBookFines = payload;
  },
  deleteBookFines(state, payload) {
    state.allBookFines.push(payload);
  },

  getAllBookFines(state, payload: BookFinesDto[]) {

    state.allBookFines = [];
    const dateNow = new Date();
    const newPayload = payload.map((book) => {
      const parseDate = /^(?<Year>\d{4})-(?<Month>\d{2})-(?<Date>\d{2})$/.exec(
        book.Fine_Date
      );
      const dueDate: Date = new Date(
        Number(parseDate?.groups?.Year),
        Number(parseDate?.groups?.Month) - 1,
        Number(parseDate?.groups?.Date)
      );

      const diffTime = Math.abs(Number(dueDate) - Number(dateNow));
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return {
        ...book,
        Payment_Amount: String(Number(book.Payment_Amount) * (days-1) ),
      };
    });
    state.allBookFines.push(...newPayload);
  },

  getOneBookFines(state, payload) {
    state.allBookFines = payload;
  },

  getProfile(state, payload) {
    state.allBookFines = payload;
  },
};

export default mutation;
