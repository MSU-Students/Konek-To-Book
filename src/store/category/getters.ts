import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CategoryStateInterface } from './state';

const getters: GetterTree<CategoryStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;
