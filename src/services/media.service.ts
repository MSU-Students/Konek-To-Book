import { lmsApiService } from "./lms-api.service";
import { DefaultApi } from "./rest-api/api";
import { MediaDto } from "./rest-api";

class MediaService extends DefaultApi {
  async getPicture(id: number) {
    const response = await lmsApiService.getMedia(id);
    return response.data;
  }

  async uploadPicture(file: File[]) {
    const response = await lmsApiService.uploadMedia(file);
    if (response.status === 201) {
      return response.data;
    } else {
      [];
    }
  }
}
const mediaservice = new MediaService();
export default mediaservice;
