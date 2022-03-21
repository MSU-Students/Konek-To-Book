import { lmsApiService } from "./lms-api.service";
import { BorrowerDto, DefaultApi } from "./rest-api";

class BorrowerService extends DefaultApi {
  async create(payload: any): Promise<BorrowerDto> {
    const response = await lmsApiService.addBorrower(payload);
    return response.data;
  }

  async getAll(): Promise<BorrowerDto> {
    const response = await lmsApiService.getBorrowers();
    return response.data;
  }

  async getOne(id: number): Promise<BorrowerDto> {
    const response = await lmsApiService.getBorrower(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lmsApiService.updateBorrower(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await lmsApiService.deleteBorrower(id);
    return response.data;
  }
}

const borrowerService = new BorrowerService();
export default borrowerService;
