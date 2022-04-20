export interface ICommercialRegister {
  id?: number;
  taxRegistrationNumber?: string;
  tva?: string;
  category?: string;
  secondaryEtabNumber?: string;
}

export class CommercialRegister implements ICommercialRegister {
  constructor(
    public id?: number,
    public taxRegistrationNumber?: string,
    public tva?: string,
    public category?: string,
    public secondaryEtabNumber?: string
  ) {}
}
