import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface } from './state';

const getters: GetterTree<AccountStateInterface, StateInterface> = {
  active(state) {
    return state.allAccount.filter((i) =>
      /^active$/i.test(i.User_Status || '')
    );
  },

  inactive(state) {
    return state.allAccount.filter((i) =>
      /^inactive$/i.test(i.User_Status || '')
    );
  },
};

export default getters;
