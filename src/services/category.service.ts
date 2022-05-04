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

  async getOne(Category_ID: number): Promise<CategoryDto> {
    const response = await lmsApiService.getCategory(Category_ID);
    return response.data;
  }

  async update(Category_ID: number, payload: any) {
    const response = await lmsApiService.updateCategory(Category_ID, payload);
    return response.data;
  }

  async delete(Category_ID: number) {
    const response = await lmsApiService.deleteCategory(Category_ID);
    return response.data;
  }
}

const categoryService = new CategoryService();
export default categoryService;
