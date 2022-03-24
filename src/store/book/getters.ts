import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { BookStateInterface } from './state';

const getters: GetterTree<BookStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;
