import { lmsApiService } from "./lms-api.service";
import { BookDto, DefaultApi } from "./rest-api";


class BookService extends DefaultApi {
  async create(payload: any): Promise<BookDto> {
    const response = await lmsApiService.addBook(payload);
    return response.data;
  }

  async getAll(): Promise<BookDto> {
    const response = await lmsApiService.getBooks();
    return response.data;
  }

  async getOne(id: number): Promise<BookDto> {
    const response = await lmsApiService.getBook(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lmsApiService.updateBook(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await lmsApiService.deleteBook(id);
    return response.data;
  }
}

const bookService = new BookService();
export default BookService;
