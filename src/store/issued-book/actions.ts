import issuedbookService from 'src/services/issued-book.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IssuedBookStateInterface } from './state';

const actions: ActionTree<IssuedBookStateInterface, StateInterface> = {
  async addIssuedBook(context, payload: any): Promise<any> {
    const result = await issuedbookService.create(payload);
    context.commit('setNewIssuedBook', result);
    await context.dispatch('getAllIssuedBook');
  },

  async editIssuedBook(context, payload: any): Promise<any> {
    const result = await issuedbookService.update(payload.IssuedBook_ID, payload);
    context.commit('updateIssuedBook', payload);
    await context.dispatch('getAllIssuedBook');
  },

  async deleteIssuedBook(context, id: number): Promise<any> {
    const result = await issuedbookService.delete(id);
    context.commit('deleteIssuedBook', result);
    await context.dispatch('getAllIssuedBook');
  },

  async getAllIssuedBook(context): Promise<any> {
    const res = await issuedbookService.getAll();
    context.commit('getAllIssuedBook', res);
    await this.dispatch('book/getAllBook');
    await this.dispatch('borrower/getAllBorrower')
    await this.dispatch('book-fines/getAllBookFines')
  },

  async getOneIssuedBook(context, id: number): Promise<any> {
    const res = await issuedbookService.getOne(id);
    context.commit('getOneIssuedBook', res);
  },
};

export default actions;
