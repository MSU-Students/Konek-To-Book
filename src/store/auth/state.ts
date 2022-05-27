export interface AUser {
  id?: number;
  U_First_Name: string;
  U_Middle_Name: string;
  U_Last_Name: string;
  username?: string;
  password?: string;
  Gender: string;
  U_Birth_Date: string;
  Address: string;
  U_Contact_Number: string;
  email?: string;
  User_Type?: string;
  User_Status: string;
  url?: Number;
}
export interface IAuthState {
  currentUser?: AUser;
}

function state(): IAuthState {
  return {
  };
}

export default state;
