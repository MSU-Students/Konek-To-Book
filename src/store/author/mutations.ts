import { MutationTree } from 'vuex';
import { AuthorStateInterface } from './state';

const mutation: MutationTree<AuthorStateInterface> = {
  setNewAuthor(state, payload) {
    state.newAuthor = payload;
  },
  updateAuthor(state, payload) {
    state.newAuthor = payload;
  },
  deleteAuthor(state, payload) {
    state.allAuthor.push(payload);
  },

  getAllAuthor(state, payload) {
    state.allAuthor = [];
    state.allAuthor.push(...payload);
  },

  getOneAuthor(state, payload) {
    state.allAuthor = payload;
  },

  getProfile(state, payload) {
    state.allAuthor = payload;
  },
};
export default mutation;
