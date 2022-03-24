import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { BorrowerStateInterface } from './state';

const getters: GetterTree<BorrowerStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;
