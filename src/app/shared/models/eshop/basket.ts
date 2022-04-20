// import {v4 as uuidv4} from 'uuid/v4';
import {IItem} from '../base/item.model';

export interface IBillOperationEshop {
  id: string;
  reference?: string;
  status?: string;
  type?: string;
  date?: any;
  dueDate?: any;
  note?: string;
  isInvoice?: boolean;
  isPanier?: boolean;
  isCommand?: boolean;
  totalHT?: number;
  totalTTC?: number;
  totalAPayer?: number;
  billOperationItemEshops?: IBillOperationItemEshop[];
  taxInvoiceBillOperations?: any;
  basesTva?: any;
  pdf?: string;
  avatarPdf?: string;
  clientId: string;
  clientName: string;
  address: string;
  phone: string;
  email: string;
  shippingConfig: any;
  paymentEshop: any;
  }

export interface IBillOperationItemEshop {
  id: string;
  quantity?: number;
  discountRate?: number;
  tva?: number;
  unitPrice?: number;
  item?: IItem;
  totalHT?: number;
  totalTTC?: number;
  billOperationEshops?: BillOperationEshop[];
  }

export class BillOperationEshop implements IBillOperationEshop {
  id: string;
  reference?: string;
  status?: string;
  type?: string;
  date?: any;
  dueDate?: any;
  note?: string;
  isInvoice?: boolean;
  isPanier?: boolean;
  isCommand?: boolean;
  totalHT?: number;
  totalTTC?: number;
  totalAPayer?: number;
  billOperationItemEshops?: IBillOperationItemEshop[];
  taxInvoiceBillOperations?: any;
  basesTva?: any;
  pdf?: string;
  avatarPdf?: string;
  clientId: string;
  clientName: string;
  address: string;
  phone: string;
  email: string;
  shippingConfig: any;
  paymentEshop: any;
}

// export interface ICommand {
//   id: string;
//   reference?: string;
//   status?: string;
//   type?: string;
//   date?: any;
//   dueDate?: any;
//   note?: string;
//   isInvoice?: boolean;
//   isPanier?: boolean;
//   isCommand?: boolean;
//   totalHT?: number;
//   totalTTC?: number;
//   totalAPayer?: number;
//   billOperationItemEshops?: IBillOperationItemEshop[];
//   taxInvoiceBillOperations?: any;
//   basesTva?: any;
//   pdf?: string;
//   avatarPdf?: string;
//   clientId: string;
//   clientName: string;
//   address: string;
//   telephone: string;
//   email: string;
//   configShipping: any;
// }
export interface IBasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
