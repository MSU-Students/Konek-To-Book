import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IssuedBookStateInterface } from './state';

const getters: GetterTree<IssuedBookStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;
