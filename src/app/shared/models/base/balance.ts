
export interface  IBalance {
    id?: number;
    notPaidHtAmount?: number;
    paidHTAmount?: number;
    tiersIntitule?: string;
    totalHtAmount?: number;
}

export interface SearchResultIBalance {
    tables: IBalance[];
    total: number;
}
