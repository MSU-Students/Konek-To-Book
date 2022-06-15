import { lmsApiService } from "./lms-api.service";
import { BookDto, DefaultApi } from "./rest-api";

class BookService extends DefaultApi {
  async create(payload: any): Promise<BookDto> {
    const response = await lmsApiService.addBook(payload);
    return response.data;
  }

  async getAll(): Promise<BookDto[]> {
    const response = await lmsApiService.getBooks();
    return response.data as unknown as BookDto[];
  }

  async getOne(Book_ID: number): Promise<BookDto> {
    const response = await lmsApiService.getBook(Book_ID);
    return response.data;
  }

  async update(Book_ID: number, payload: any) {
    const response = await lmsApiService.updateBook(Book_ID, payload);
    return response.data;
  }

  async delete(Book_ID: number) {
    const response = await lmsApiService.deleteBook(Book_ID);
    return response.data;
  }
}

const bookService = new BookService();
export default bookService;
