import bookfinesService from 'src/services/book-fines.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { BookFinestateInterface } from './state';

const actions: ActionTree<BookFinestateInterface, StateInterface> = {
  async addBookFines(context, payload: any): Promise<any> {
    const result = await bookfinesService.create(payload);
    context.commit('setNewBookFines', result);
    await context.dispatch('getAllBookFines');
  },

  async editBookFines(context, payload: any): Promise<any> {
    const result = await bookfinesService.update(payload.id, payload);
    context.commit('updateBookFines', result);
    await context.dispatch('getAllBookFines');
  },

  async deleteBookFines(context, id: number): Promise<any> {
    const result = await bookfinesService.delete(id);
    context.commit('deleteBookFines', result);
  },

  async getAllBookFines(context): Promise<any> {
    const res = await bookfinesService.getAll();
    context.commit('getAllBookFines', res);
  },

  async getOneBookFines(context, id: number): Promise<any> {
    const res = await bookfinesService.getOne(id);
    context.commit('getOneBookFines', res);
  },
};

export default actions;
