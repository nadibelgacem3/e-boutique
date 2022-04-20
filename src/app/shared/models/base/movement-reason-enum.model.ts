export interface IMovementReasonEnum {
  id?: number;
  movementReasonName?: string;
}

export class MovementReasonEnum implements IMovementReasonEnum {
  constructor(public id?: number, public movementReasonName?: string) {}
}
