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

  async getOne(Borrower_ID: number): Promise<BorrowerDto> {
    const response = await lmsApiService.getBorrower(Borrower_ID);
    return response.data;
  }

  async update(Borrower_ID: number, payload: any) {
    const response = await lmsApiService.updateBorrower(Borrower_ID, payload);
    return response.data;
  }

  async delete(Borrower_ID: number) {
    const response = await lmsApiService.deleteBorrower(Borrower_ID);
    return response.data;
  }
}

const borrowerService = new BorrowerService();
export default borrowerService;
