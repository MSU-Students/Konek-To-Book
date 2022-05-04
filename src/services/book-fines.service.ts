import { lmsApiService } from "./lms-api.service";
import { BookFinesDto, DefaultApi } from "./rest-api";

class BookFinesService extends DefaultApi {
  async create(payload: any): Promise<BookFinesDto> {
    const response = await lmsApiService.addBookFines(payload);
    return response.data;
  }

  async getAll(): Promise<BookFinesDto> {
    const response = await lmsApiService.getBookFines();
    return response.data;
  }

  async getOne(BookFines_ID: number): Promise<BookFinesDto> {
    const response = await lmsApiService.getBookFine(BookFines_ID);
    return response.data;
  }

  async update(BookFines_ID: number, payload: any) {
    const response = await lmsApiService.updateBookFine(BookFines_ID, payload);
    return response.data;
  }

  async delete(BookFines_ID: number) {
    const response = await lmsApiService.deleteBookFine(BookFines_ID);
    return response.data;
  }
}

const bookfinesService = new BookFinesService();
export default bookfinesService;
