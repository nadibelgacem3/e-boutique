
export interface  ITransaction {
    id?: number;
    numero?: string;
    reference?: string;
    note?: string;
    type?: string;
    reason?: string;
    refDocument: string;
    userName: string;
    source?: string;
    destination?: string;
    transactionDate?: any;
    amount?: number;
    bankConfig?: any;
    solde?: any;
    isCash?: boolean;
    isBankCheck?: boolean;
    isBankTrait?: boolean;
    isBankTransfert?: boolean;
    isDeductedAtSource?: boolean;
}

export interface SearchResultIITransaction {
    tables: ITransaction[];
    total: number;
}

