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
    const newPayload = payload.map((book) => ({
      ...book,
      Payment_Amount: String(Number(book.Payment_Amount) * 5),
    }));
    console.log(newPayload);
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
