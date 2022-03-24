import { MutationTree } from 'vuex';
import { CategoryStateInterface } from './state';

const mutation: MutationTree<CategoryStateInterface> = {
  setNewCategory(state, payload) {
    state.newCategory = payload;
  },
  updateCategory(state, payload) {
    state.newCategory = payload;
  },
  deleteCategory(state, payload) {
    state.allCategory.push(payload);
  },

  getAllCategory(state, payload) {
    state.allCategory = [];
    state.allCategory.push(...payload);
  },

  getOneCategory(state, payload) {
    state.allCategory = payload;
  },

  getProfile(state, payload) {
    state.allCategory = payload;
  },
};

export default mutation;
