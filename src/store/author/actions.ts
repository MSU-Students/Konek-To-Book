import authorService from 'src/services/author.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthorStateInterface } from './state';

const actions: ActionTree<AuthorStateInterface, StateInterface> = {
  async addAuthor(context, payload: any): Promise<any> {
    const result = await authorService.create(payload);
    context.commit('setNewAuthor', result);
    await context.dispatch('getAllAuthor');
  },

  async editAuthor(context, payload: any): Promise<any> {
    const result = await authorService.update(payload.authorID, payload);
    context.commit('updateAuthor', result);
    await context.dispatch('getAllAuthor');

  },

  async deleteAuthor(context, id: number): Promise<any> {
    const result = await authorService.delete(id);
    context.commit('deleteAuthor', result);
    await context.dispatch('getAllAuthor');
  },

  async getAllAuthor(context): Promise<any> {
    const res = await authorService.getAll();
    context.commit('getAllAuthor', res);
  },

  async getOneAuthor(context, id: number): Promise<any> {
    const res = await authorService.getOne(id);
    context.commit('getOneAuthor', res);
  },

};

export default actions;
