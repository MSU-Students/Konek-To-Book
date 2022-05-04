import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IssuedBookStateInterface } from './state';

const getters: GetterTree<IssuedBookStateInterface, StateInterface> = {
  issuedBook(state) {
    return state.allIssuedBook.filter((i) =>
      /^issued$/i.test(i.IssuedBook_Status || '')
    );
  },

  returnBook(state) {
    return state.allIssuedBook.filter((i) =>
      /^return$/i.test(i.IssuedBook_Status || '')
    );
  },

  lostBook(state) {
    return state.allIssuedBook.filter((i) =>
      /^lost$/i.test(i.IssuedBook_Status || '')
    );
  },
};

export default getters;
