export interface IInvoicePaymentMethod {
  id?: number;
  invoicePaymentMethodName?: string;
}

export class InvoicePaymentMethod implements IInvoicePaymentMethod {
  constructor(public id?: number, public invoicePaymentMethodName?: string) {}
}
