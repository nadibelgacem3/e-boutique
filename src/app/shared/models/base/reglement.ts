

export interface  IReglement {
    id?: number;
    reference?: string;
    amount?: number;
    isCash?: boolean;
    isBankCheck?: boolean;
    isBankTrait?: boolean;
    isBankTransfert?: boolean;
    isDeductedAtSource?: boolean;
    reglementDate?: any;
    dueDate?: any;
    checkHolder?: string;
    bank?: string;
    recipientAccount?: string;
    sourceAccountNumbe?: string;
    transferInformation?: string;
    bankCheckorTraitNumber?: string;
    avatar?: string;
    imageJustif?: string;
    status?: string;
    isVersed?: boolean;
    transactions?: any[];
    payment?: any;
    hasPayment?: boolean;
}

export interface SearchResultIReglement {
    tables: IReglement[];
    total: number;
}
