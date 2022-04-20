export interface IPaymentConfig {
    id?: number;
    details?: string;
    phone?: string;
    codePhone?: string;
    designation?: string;
    imageJustif?: string;
    iban?: string;
    isCash?: boolean;
    isBankTransfert?: boolean;
    isCard?: boolean;
    isD17?: boolean;
    isActivated?: boolean;
}

export class PaymentConfig implements IPaymentConfig {
    constructor(
        public id?: number,
        public details?: string,
        public phone?: string,
        public codePhone?: string,
        public designation?: string,
        public imageJustif?: string,
        public iban?: string,
        public isCash?: boolean,
        public isBankTransfert?: boolean,
        public isCard?: boolean,
        public isD17?: boolean
    ) {
    }
}
