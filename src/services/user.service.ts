import { lmsApiService } from "./lms-api.service";
import { DefaultApi, UserDto } from "./rest-api";

class UserService extends DefaultApi {
  async create(payload: any): Promise<UserDto> {
    const response = await lmsApiService.addUser(payload);
    return response.data;
  }

  async getAll(): Promise<UserDto> {
    const response = await lmsApiService.getUsers();
    return response.data;
  }

  async getOne(id: number): Promise<UserDto> {
    const response = await lmsApiService.getUser(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lmsApiService.updateUser(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await lmsApiService.deleteUser(id);
    return response.data;
  }

  async getUserProfile() {
    const response = await lmsApiService.getProfile();
    return response.data;
  }
}

const userService = new UserService();
export default userService;
