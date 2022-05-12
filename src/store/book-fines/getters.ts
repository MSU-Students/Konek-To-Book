import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { BookFinestateInterface } from './state';

const getters: GetterTree<BookFinestateInterface, StateInterface> = {
  finesBook(state) {
    return state.allBookFines.filter((i) =>
      /^fines$/i.test(i.Payment_Status || '')
    );
  },

  paidBook(state) {
    return state.allBookFines.filter((i) =>
      /^paid$/i.test(i.Payment_Status || '')
    );
  },

  overdueBook(state) {
    return state.allBookFines.filter((i) =>
      /^overdue$/i.test(i.Payment_Status || '')
    );
  },
};

export default getters;
