export interface IVocher {
  id?: number;
  vocherKey?: string;
}

export class Vocher implements IVocher {
  constructor(public id?: number, public vocherKey?: string) {}
}
