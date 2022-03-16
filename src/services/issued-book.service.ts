import { lmsApiService } from "./lms-api.service";
import { DefaultApi, IssuedBookDto } from "./rest-api";



class IssuedBookService extends DefaultApi {
  async create(payload: any): Promise<IssuedBookDto> {
    const response = await lmsApiService.addIssuedBook(payload);
    return response.data;
  }

  async getAll(): Promise<IssuedBookDto> {
    const response = await lmsApiService.getIssuedBooks();
    return response.data;
  }

  async getOne(id: number): Promise<IssuedBookDto> {
    const response = await lmsApiService.getIssuedBook(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lmsApiService.updateIssuedBook(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await lmsApiService.deleteIssuedBook(id);
    return response.data;
  }
}

const issuedbookService = new IssuedBookService();
export default issuedbookService;
