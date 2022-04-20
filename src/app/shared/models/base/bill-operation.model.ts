import { Moment } from 'moment';
import { ITiers } from './tiers.model';
import { IBillOperationItem } from './bill-operation-item.model';



export interface IBillOperation {
  id?: number;

  reference?: string;
  status?: string;
  type?: string;
  date?: any;
  dueDate?: any;
  taxStamp?: number;
  note?: string;
  isInvoice?: boolean;
  isBl?: boolean;
  isDeleted?: boolean;
  isQuote?: boolean;
  isAvoir?: boolean;
  isBon?: boolean;
  isCommand?: boolean;
  isDeductedAtSource?: boolean;
  fodec?: number;
  tiers?: ITiers;
  totalHT?: number;
  totalTTC?: number;
  totalAPayer?: number;
  billOperationItems?: IBillOperationItem[];
  taxInvoiceBillOperations?: any;
  basesTva?: any;
  isReceived?: any;
  pdf?: string;
  avatarPdf?: string;
  isOverdue?: boolean;
}


export interface SearchResultIBillOperation {
  tables: IBillOperation[];
  total: number;
}

export class BillOperation implements IBillOperation {
  constructor(
    public id?: number,
    public totalAPayer?: number,
    public reference?: string,
    public status?: string,
    public type?: string,
    public date?: any,
    public dueDate?: any,
    public taxStamp?: number,
    public note?: string,
    public isInvoice?: boolean,
    public isBl?: boolean,
    public isQuote?: boolean,
    public isAvoir?: boolean,
    public isBon?: boolean,
    public isCommand?: boolean,
    public isDeductedAtSource?: boolean,
    public totalHT?: number,
    public totalTTC?: number,
    public isDeleted?: boolean,
    public fodec?: number,
    public tiers?: ITiers,
    public isReceived?: any,
    public pdf?: string,
    public  avatarPdf?: string,
    public billOperationItems?: IBillOperationItem[]
  ) {
    this.isInvoice = this.isInvoice || false;
    this.isBl = this.isBl || false;
    this.isQuote = this.isQuote || false;
    this.isAvoir = this.isAvoir || false;
    this.isBon = this.isBon || false;
    this.isCommand = this.isCommand || false;
    this.isDeleted = this.isDeleted || false;
  }
}
