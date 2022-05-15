import { lmsApiService } from "./lms-api.service";
import { DefaultApi } from "./rest-api/api";
import { MediaDto } from "./rest-api";

class MediaService extends DefaultApi {
  async getPicture(Media_id: number) {
    const response = await lmsApiService.getMedia(Media_id);
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
