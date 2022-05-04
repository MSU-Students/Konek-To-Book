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

  async getOne(Publisher_ID: number): Promise<PublisherDto> {
    const response = await lmsApiService.getPublisher(Publisher_ID);
    return response.data;
  }

  async update(Publisher_ID: number, payload: any) {
    const response = await lmsApiService.updatePublisher(Publisher_ID, payload);
    return response.data;
  }

  async delete(Publisher_ID: number) {
    const response = await lmsApiService.deletePublisher(Publisher_ID);
    return response.data;
  }
}

const publisherService = new PublisherService();
export default publisherService;
