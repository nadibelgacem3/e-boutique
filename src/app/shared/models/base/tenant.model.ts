export interface ITenant {
  id?: number;
  schema?: string;
}

export class Tenant implements ITenant {
  constructor(public id?: number, public schema?: string) {}
}
