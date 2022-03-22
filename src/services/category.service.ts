import { lmsApiService } from "./lms-api.service";
import { CategoryDto, DefaultApi } from "./rest-api";



class CategoryService extends DefaultApi {
  async create(payload: any): Promise<CategoryDto> {
    const response = await lmsApiService.addCategory(payload);
    return response.data;
  }

  async getAll(): Promise<CategoryDto> {
    const response = await lmsApiService.getCategories();
    return response.data;
  }

  async getOne(id: number): Promise<CategoryDto> {
    const response = await lmsApiService.getCategory(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lmsApiService.updateCategory(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await lmsApiService.deleteCategory(id);
    return response.data;
  }
}

const categoryService = new CategoryService();
export default categoryService;
