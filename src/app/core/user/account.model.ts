export class Account {
  constructor(
    public activated: boolean,
    public isOwner: boolean,
    public authorities: string[],
    public email: string,
    public firstName: string,
    public langKey: string,
    public lastName: string,
    public login: string,
    public  phone: number,
    public imageUrl: string,
    public imageContentType?: string,
    public image?: any,
    public avatar?: string,
    public  company?: any,
    public dateBirthday?: string,
    public description?: string
  ) {
  }
}
