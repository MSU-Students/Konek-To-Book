import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { BookStateInterface } from './state';

const getters: GetterTree<BookStateInterface, StateInterface> = {
  available(state) {
    return state.allBook.filter((i) =>
      /^yes$/i.test(i.Availability || '')
    );
  },

  notavail(state) {
    return state.allBook.filter((i) =>
      /^no$/i.test(i.Availability || '')
    );
  },

};

export default getters;
