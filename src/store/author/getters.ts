import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthorStateInterface } from './state';

const getters: GetterTree<AuthorStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;
