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
    const result = await borrowerService.update(payload.id, payload);
    context.commit('updateBorrower', result);
    await context.dispatch('getAllBorrower');
  },

  async deleteBorrower(context, id: number): Promise<any> {
    const result = await borrowerService.delete(id);
    context.commit('deleteBorrower', result);
    await this.dispatch('getAllBorrower');
  },

  async getAllBorrower(context): Promise<any> {
    const res = await borrowerService.getAll();
    context.commit('getAllBorrower', res);
    await this.dispatch('issued-book/getAllIssuedBook')
  },

  async getOneBorrower(context, id: number): Promise<any> {
    const res = await borrowerService.getOne(id);
    context.commit('getOneBorrower', res);
  },
};

export default actions;
