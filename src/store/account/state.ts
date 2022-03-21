export interface IAccountInfo {
  Id?: number;
  studentID: string;
  FName: string;
  MName: string;
  LName: string;
  gender: string;
  bdate: string;
  address: string;
  contact: string;
  username: string;
  password: string;
  usertype: string;
}

export interface AccountStateInterface {
  allAccount: IAccountInfo[];
  activeAccount?: IAccountInfo;
}

function state(): AccountStateInterface {
  return {
    allAccount: [
      {
        studentID: "20187892",
        FName: "Norhani",
        MName: "A.",
        LName: "Ayaon",
        gender: "Female",
        bdate: "08-10-1998",
        address: "Marawi City",
        contact: "09876567889",
        username: "Kanie",
        password: "Kanie08",
        usertype: "Admin",
      },
    ],
  };
}

export default state;
