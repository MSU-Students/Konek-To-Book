import bookService from 'src/services/book.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { BookStateInterface } from './state';

const actions: ActionTree<BookStateInterface, StateInterface> = {
  async addBook(context, payload: any): Promise<any> {
    const result = await bookService.create(payload);
    context.commit('setNewBook', result);
    await context.dispatch('getAllBook');
  },

  async editBook(context, payload: any): Promise<any> {
    const result = await bookService.update(payload.Book_ID, payload);
    context.commit('updateBook', payload);
    await context.dispatch('getAllBook');
  },

  async deleteBook(context, Book_ID: number): Promise<any> {
    const result = await bookService.delete(Book_ID);
    context.commit('deleteBook', result);
    await context.dispatch('getAllBook');
  },

  async getAllBook(context): Promise<any> {
    const res = await bookService.getAll();
    context.commit('getAllBook', res);
    await this.dispatch('author/getAllAuthor');
    await this.dispatch('category/getAllCategory')
    await this.dispatch('publisher/getAllPublisher')
  },

  async getOneBook(context, Book_ID: number): Promise<any> {
    const res = await bookService.getOne(Book_ID);
    context.commit('getOneBook', res);
  },
};

export default actions;
