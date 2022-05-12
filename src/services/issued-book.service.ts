import { lmsApiService } from "./lms-api.service";
import { DefaultApi, IssuedBookDto } from "./rest-api";

class IssuedBookService extends DefaultApi {
  async create(payload: any) {
    const response = await lmsApiService.addIssuedBook(payload);
    if (response.status === 201) {
      return response.data;
    } else {
      [];
    }
  }

  async getAll(): Promise<IssuedBookDto> {
    const response = await lmsApiService.getIssuedBooks();
    return response.data;
  }

  async getOne(IssuedBook_ID: number): Promise<IssuedBookDto> {
    const response = await lmsApiService.getIssuedBook(IssuedBook_ID);
    return response.data;
  }

  async update(IssuedBook_ID: number, payload: any) {
    const response = await lmsApiService.updateIssuedBook(
      IssuedBook_ID,
      payload
    );
    return response.data;
  }

  async delete(IssuedBook_ID: number) {
    const response = await lmsApiService.deleteIssuedBook(IssuedBook_ID);
    return response.data;
  }
}

const issuedbookService = new IssuedBookService();
export default issuedbookService;
