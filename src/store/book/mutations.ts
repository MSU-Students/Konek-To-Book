import { MutationTree } from 'vuex';
import { BookStateInterface } from './state';

const mutation: MutationTree<BookStateInterface> = {
  setNewBook(state, payload) {
    state.newBook = payload;
  },
  updateBook(state, payload) {
    state.newBook = payload;
  },
  deleteBook(state, payload) {
    state.allBook.push(payload);
  },

  getAllBook(state, payload) {
    state.allBook = [];
    state.allBook.push(...payload);
  },

  getOneBook(state, payload) {
    state.allBook = payload;
  },

  getProfile(state, payload) {
    state.allBook = payload;
  },
};

export default mutation;
