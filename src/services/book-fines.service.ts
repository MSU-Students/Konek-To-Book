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

  async getOne(id: number): Promise<BookFinesDto> {
    const response = await lmsApiService.getBookFine(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lmsApiService.updateBookFine(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await lmsApiService.deleteBookFine(id);
    return response.data;
  }
}

const bookfinesService = new BookFinesService();
export default bookfinesService;
