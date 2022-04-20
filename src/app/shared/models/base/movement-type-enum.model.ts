export interface IMovementTypeEnum {
  id?: number;
  movementName?: string;
}

export class MovementTypeEnum implements IMovementTypeEnum {
  constructor(public id?: number, public movementName?: string) {}
}
