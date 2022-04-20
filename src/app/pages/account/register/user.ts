export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  langKey?: string;
  phone?: string;
  id_token?: string;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public langKey?: string,
    public phone?: string,
    public id_token?: string,
  ) {
  }
}
