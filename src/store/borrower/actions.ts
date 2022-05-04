import borrowerService from 'src/services/borrower.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { BorrowerStateInterface } from './state';

const actions: ActionTree<BorrowerStateInterface, StateInterface> = {
  async addBorrower(context, payload: any): Promise<any> {
    const result = await borrowerService.create(payload);
    context.commit('setNewBorrower', result);
    await context.dispatch('getAllBorrower');
  },

  async editBorrower(context, payload: any): Promise<any> {
    const result = await borrowerService.update(payload.Borrower_ID, payload);
    context.commit('updateBorrower', payload);
    await context.dispatch('getAllBorrower');
  },

  async deleteBorrower(context, Borrower_ID: number): Promise<any> {
    const result = await borrowerService.delete(Borrower_ID);
    context.commit('deleteBorrower', result);
    await context.dispatch('getAllBorrower');
  },

  async getAllBorrower(context): Promise<any> {
    const res = await borrowerService.getAll();
    context.commit('getAllBorrower', res);
  },

  async getOneBorrower(context, Borrower_ID: number): Promise<any> {
    const res = await borrowerService.getOne(Borrower_ID);
    context.commit('getOneBorrower', res);
  },
};

export default actions;
