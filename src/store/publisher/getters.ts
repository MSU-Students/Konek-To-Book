import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PublisherStateInterface } from './state';

const getters: GetterTree<PublisherStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;
