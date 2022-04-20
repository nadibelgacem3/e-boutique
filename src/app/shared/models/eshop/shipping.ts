export class IShipping {
    id?: number;
    providerName?: string;
    frais?: number;
    avatar?: string;
    description?: string;
  hideme?: boolean;
}
export interface SearchResultIShipping {
    tables: IShipping[];
    total: number;
}
