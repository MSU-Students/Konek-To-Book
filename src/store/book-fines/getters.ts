import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { BookFinestateInterface } from './state';

const getters: GetterTree<BookFinestateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;
