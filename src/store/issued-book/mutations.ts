import { MutationTree } from 'vuex';
import { IssuedBookStateInterface } from './state';

const mutation: MutationTree<IssuedBookStateInterface> = {
  setNewIssuedBook(state, payload) {
    state.newIssuedBook = payload;
  },
  updateIssuedBook(state, payload) {
    state.newIssuedBook = payload;
  },
  deleteIssuedBook(state, payload) {
    state.allIssuedBook.push(payload);
  },

  getAllIssuedBook(state, payload) {
    state.allIssuedBook = [];
    state.allIssuedBook.push(...payload);
  },

  getOneIssuedBook(state, payload) {
    state.allIssuedBook = payload;
  },

  getProfile(state, payload) {
    state.allIssuedBook = payload;
  },
};

export default mutation;
