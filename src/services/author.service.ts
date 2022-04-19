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

  async getOne(authorID: number): Promise<AuthorDto> {
    const response = await lmsApiService.getAuthor(authorID);
    return response.data;
  }

  async update(authorID: number, payload: any) {
    const response = await lmsApiService.updateAuthor(authorID, payload);
    return response.data;
  }

  async delete(authorID: number) {
    const response = await lmsApiService.deleteAuthor(authorID);
    return response.data;
  }
}

const authorService = new AuthorService();
export default authorService;
