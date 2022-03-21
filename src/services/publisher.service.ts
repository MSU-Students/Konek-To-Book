import { lmsApiService } from "./lms-api.service";
import { DefaultApi, PublisherDto } from "./rest-api";


class PublisherService extends DefaultApi {
  async create(payload: any): Promise<PublisherDto> {
    const response = await lmsApiService.addPublisher(payload);
    return response.data;
  }

  async getAll(): Promise<PublisherDto> {
    const response = await lmsApiService.getPublishers();
    return response.data;
  }

  async getOne(id: number): Promise<PublisherDto> {
    const response = await lmsApiService.getPublisher(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lmsApiService.updatePublisher(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await lmsApiService.deletePublisher(id);
    return response.data;
  }
}

const publisherService = new PublisherService();
export default publisherService;
