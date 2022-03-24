import { MutationTree } from 'vuex';
import { BorrowerStateInterface } from './state';

const mutation: MutationTree<BorrowerStateInterface> = {
  setNewBorrower(state, payload) {
    state.newBorrower = payload;
  },
  updateBorrower(state, payload) {
    state.newBorrower = payload;
  },
  deleteBorrower(state, payload) {
    state.allBorrower.push(payload);
  },

  getAllBorrower(state, payload) {
    state.allBorrower = [];
    state.allBorrower.push(...payload);
  },

  getOneBorrower(state, payload) {
    state.allBorrower = payload;
  },

  getProfile(state, payload) {
    state.allBorrower = payload;
  },
};

export default mutation;
