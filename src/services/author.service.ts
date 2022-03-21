import { lmsApiService } from "./lms-api.service";
import { DefaultApi } from "./rest-api";
import {AuthorDto} from "./rest-api"


class AuthorService extends DefaultApi {
  async create(payload: any): Promise<AuthorDto> {
    const response = await lmsApiService.addAuthor(payload);
    return response.data;
  }

  async getAll(): Promise<AuthorDto> {
    const response = await lmsApiService.getAuthors();
    return response.data;
  }

  async getOne(id: number): Promise<AuthorDto> {
    const response = await lmsApiService.getAuthor(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lmsApiService.updateAuthor(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await lmsApiService.deleteAuthor(id);
    return response.data;
  }
}

const authorService = new AuthorService();
export default authorService;
