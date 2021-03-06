import categoryService from 'src/services/category.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CategoryStateInterface } from './state';

const actions: ActionTree<CategoryStateInterface, StateInterface> = {
  async addCategory(context, payload: any): Promise<any> {
    const result = await categoryService.create(payload);
    context.commit('setNewCategory', result);
    await context.dispatch('getAllCategory');
  },

  async editCategory(context, payload: any): Promise<any> {
    const result = await categoryService.update(payload.Category_ID, payload);
    context.commit('updateCategory', payload);
    await context.dispatch('getAllCategory');
  },

  async deleteCategory(context, Category_ID: number): Promise<any> {
    const result = await categoryService.delete(Category_ID);
    context.commit('deleteCategory', result);
    await context.dispatch('getAllCategory');
  },

  async getAllCategory(context): Promise<any> {
    const res = await categoryService.getAll();
    context.commit('getAllCategory', res);
  },

  async getOneCategory(context, Category_ID: number): Promise<any> {
    const res = await categoryService.getOne(Category_ID);
    context.commit('getOneCategory', res);
  },
};

export default actions;
