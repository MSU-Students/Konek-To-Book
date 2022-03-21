export interface AUser {
  id?: number;
  username: string;
  password: string;
  User_Type: string;
}
export interface IAuthState {
  currentUser?: AUser;
}

function state(): IAuthState {
  return {
    currentUser: undefined,
  };
}

export default state;
