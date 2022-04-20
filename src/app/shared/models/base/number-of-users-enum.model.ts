export interface INumberOfUsersEnum {
  id?: number;
  numberOfUsersMin?: number;
  numberOfUsersMax?: number;
}

export class NumberOfUsersEnum implements INumberOfUsersEnum {
  constructor(public id?: number, public numberOfUsersMin?: number, public numberOfUsersMax?: number) {}
}
