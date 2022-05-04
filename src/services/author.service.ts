import { lmsApiService } from "./lms-api.service";
import { DefaultApi } from "./rest-api";
import { AuthorDto } from "./rest-api";

class AuthorService extends DefaultApi {
  async create(payload: any): Promise<AuthorDto> {
    const response = await lmsApiService.addAuthor(payload);
    return response.data;
  }

  async getAll(): Promise<AuthorDto> {
    const response = await lmsApiService.getAuthors();
    return response.data;
  }

  async getOne(Author_ID: number): Promise<AuthorDto> {
    const response = await lmsApiService.getAuthor(Author_ID);
    return response.data;
  }

  async update(Author_ID: number, payload: any) {
    const response = await lmsApiService.updateAuthor(Author_ID, payload);
    return response.data;
  }

  async delete(Author_ID: number) {
    const response = await lmsApiService.deleteAuthor(Author_ID);
    return response.data;
  }
}

const authorService = new AuthorService();
export default authorService;
