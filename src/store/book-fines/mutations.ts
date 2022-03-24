import { MutationTree } from 'vuex';
import { BookFinestateInterface } from './state';

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

  getAllBookFines(state, payload) {
    state.allBookFines = [];
    state.allBookFines.push(...payload);
  },

  getOneBookFines(state, payload) {
    state.allBookFines = payload;
  },

  getProfile(state, payload) {
    state.allBookFines = payload;
  },
};

export default mutation;
