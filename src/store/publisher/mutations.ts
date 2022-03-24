import { MutationTree } from 'vuex';
import { PublisherStateInterface } from './state';

const mutation: MutationTree<PublisherStateInterface> = {
  setNewPublisher(state, payload) {
    state.newPublisher = payload;
  },
  updatePublisher(state, payload) {
    state.newPublisher = payload;
  },
  deletePublisher(state, payload) {
    state.allPublisher.push(payload);
  },

  getAllPublisher(state, payload) {
    state.allPublisher = [];
    state.allPublisher.push(...payload);
  },

  getOnePublisher(state, payload) {
    state.allPublisher = payload;
  },

  getProfile(state, payload) {
    state.allPublisher = payload;
  },
};

export default mutation;
