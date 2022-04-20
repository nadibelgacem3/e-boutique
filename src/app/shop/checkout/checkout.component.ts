import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';
import {environment} from '../../../environments/environment';
import {Product} from '../../shared/classes/product';
import {ProductService} from '../../shared/services/product.service';
import {OrderService} from '../../shared/services/order.service';
import {AccountService} from '../../core/auth/account.service';
import {BasketService} from '../../services/basket.service';
import {ShippingService} from '../../services/shipping.service';
import {TranslateService} from '@ngx-translate/core';
import {JhiDataUtils, JhiEventManager} from 'ng-jhipster';
import {CompanyConfigService} from '../../services/company-config.service';
import {DatePipe} from '@angular/common';
import {PaymentService} from '../../services/payment.service';
import {ImageConverterService} from '../../services/image-converter.service';
import {TranslateApiService} from '../../services/translate-api.service';
import {BankConfigService} from '../../services/bank-config.service';
import {IShipping} from '../../shared/models/eshop/shipping';
import {IBillOperationEshop} from '../../shared/models/eshop/basket';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as uuid from 'uuid';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {ItemService} from '../../services/item.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    public checkoutForm: FormGroup;
    public products: Product[] = [];
    public payPalConfig ?: IPayPalConfig;
    public payment: string = 'Stripe';
    public amount: any;
    societe: string;
    phone = '00 000 000 ';
    adresse: string;
    e_mail = 'ad@mm';
    commercialRegister = '';
    bankAccount = '';
    img2: any;
    reference = '2021/0001';
    currentDate = new Date();
    day = this.currentDate.getDate();
    month = this.currentDate.getMonth() + 1;
    year = this.currentDate.getFullYear();
    bankEnums = [];
    selectedBank = null;
    imgD17 = '../../../assets/images/d17.png';
    imgTrait = '../../../assets/images/trait.png';

    constructor(private fb: FormBuilder, public accountService: AccountService,
                public productService: ProductService,        protected itemService: ItemService,
                private orderService: OrderService, private basketService: BasketService,
                private shippingService: ShippingService, private translate: TranslateService, protected eventManager: JhiEventManager,
                protected companyConfigService: CompanyConfigService, private datePipe: DatePipe, protected paymentService: PaymentService,
                private imageconverter: ImageConverterService, private translateApiService: TranslateApiService,
                protected bankConfigService: BankConfigService, protected dataUtils: JhiDataUtils) {
        this.checkoutForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
            lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
            phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
            email: ['', [Validators.required, Validators.email]],
            location: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]]
        });
    }

    account: any;
    location = '';
    isLocation = false;
    shippings = [];
    isShipping = false;
    configShipping: IShipping;
    paymentConfigs = [];
    paymentEshopConfig = null;
    delay = 0;
    ngOnInit(): void {
        this.shippingService.query().subscribe(res2 => {
            this.shippings = res2.body;
            this.shippings.map(i => i.hideme = false);
            if (this.shippings.length > 0) {
                this.shippings[0].hideme = true;
                this.isShipping = true;
                this.frais = this.shippings[0].frais;
                if(this.shippings[0].delay) {
                    this.delay = this.shippings[0].delay;
                }
                this.configShipping = this.shippings[0];
            } else {
                this.isShipping = false;

            }
        });
        this.paymentService.query().subscribe(res => {
            const payments = res;
            for (let i = 0; i < payments.length; i++) {
                if (payments[i].isActivated) {
                    this.paymentConfigs.push(payments[i]);
                }
            }
            this.paymentConfigs.map(i => i.hideme = false);
            for (let i = 0; i < this.paymentConfigs.length; i++) {
                if (this.paymentConfigs[i].isCash) {
                    this.paymentConfigs[i].hideme = true;
                    this.paymentEshopConfig = this.paymentConfigs[i];
                    this.changeConfigPayment(this.paymentConfigs[i]);
                }
            }
        });
        this.bankConfigService.query().subscribe(res => {
            this.bankEnums = res.body;
        });
        this.accountService.identity().subscribe(account => {
            if (account) {
                this.account = account;
                this.checkoutForm.patchValue({
                    firstname: account.firstName,
                    lastname: account.lastName,
                    email: account.email,
                    phone: account.phone,
                });
                if (this.account.userEshopLocations[0]) {
                    const eshopLocation = this.account.userEshopLocations[0];
                    this.isLocation = false;
                    this.isShowLocation = true;
                    this.location = eshopLocation.streetAddress + ' ' + eshopLocation.city + ' '
                        + ' - ' + eshopLocation.stateProvince + ', ' + eshopLocation.countryName;
                    this.checkoutForm.patchValue({
                        location: eshopLocation.streetAddress + ' ' + eshopLocation.city + ' '
                            + ' - '
                            + eshopLocation.stateProvince + ', ' + eshopLocation.countryName
                    });
                }


            }
        });
        this.companyConfigService
            .query().subscribe((res) => {
            this.societe = res.body[0].name;

            const companyConfig: any = res.body[0];

            if (companyConfig.bankConfig) {
                this.bankAccount = 'RIB :' + ' ' + companyConfig.bankConfig.bankCode + companyConfig.bankConfig.accountCode +
                    companyConfig.bankConfig.accountNumber + companyConfig.bankConfig.key + ' - ';

            }
            if (res.body[0].logo) {
                this.imageconverter.convertImageUrlService(res.body[0].logo).subscribe(resss => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        this.img2 = reader.result;
                    };
                    reader.readAsDataURL(resss);
                });
            } else {
                this.imageconverter.convertImageService().subscribe(ressss => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        this.img2 = reader.result;
                    };
                    reader.readAsDataURL(ressss);
                });
            }
            if (res.body[0].companyLocation) {
                const addrss = res.body[0].companyLocation;
                if (addrss.countryName) {
                    this.adresse = addrss.streetAddress + ' ' + addrss.city + ' ' + addrss.postalCode + ' - ' +
                        addrss.stateProvince + ', ' + addrss.countryName;
                } else {
                    this.adresse = addrss.streetAddress + ' ' + addrss.postalCode;
                }
                // this.adresse = res.body[0].companyLocation.streetAddress + ' ' + res.body[0].companyLocation.city + ' '
                //     + res.body[0].companyLocation.countryName + ' ' + +res.body[0].companyLocation.postalCode;
            }
            if (res.body[0].email2) {
                this.e_mail = res.body[0].email2;
            } else {
                this.e_mail = '';
            }
            if (res.body[0].phone1) {
                this.phone = res.body[0].phone1;
            } else {
                this.phone = '';
            }

            if (res.body[0].commercialRegister) {
                const tva = res.body[0].commercialRegister;
                this.commercialRegister = tva.taxRegistrationNumber + '/' + tva.tva + '/' + tva.category + '/' + tva.secondaryEtabNumber;
            }


            // this.societe = res.body[0].name;
        });
        this.basketService.getRefCommand().subscribe(res => {
            this.reference = res.reference;
        });
        this.productService.cartItems.subscribe(response => this.products = response);
        this.getTotal.subscribe(amount => this.amount = amount);
        this.initConfig();
    }

    HH = this.currentDate.getHours();
    mm = this.currentDate.getMinutes();

    public get getTotal(): Observable<number> {
        return this.productService.cartTotalAmount();
    }

    onUpdate($event) {

        console.log($event);
        // const account: any = $event;
        this.account = $event;
        if (this.account.userEshopLocations[0]) {
            this.isLocation = false;
            this.isShowLocation = true;
            const eshopLocation = this.account.userEshopLocations[0];
            this.isLocation = false;
            this.isShowLocation = true;
            this.location = eshopLocation.streetAddress + ' ' + eshopLocation.city + ' '
                + ' - ' + eshopLocation.stateProvince + ', ' + eshopLocation.countryName;
            this.checkoutForm.patchValue({
                location: eshopLocation.streetAddress + ' ' + eshopLocation.city + ' '
                    + ' - '
                    + eshopLocation.stateProvince + ', ' + eshopLocation.countryName
            });
        }
    }

    // Stripe Payment Gateway
    stripeCheckout() {
        var handler = (<any> window).StripeCheckout.configure({
            key: environment.stripe_token, // publishble key
            locale: 'auto',
            token: (token: any) => {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                // this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount, this.frais);
            }
        });
        handler.open({
            name: 'Multikart',
            description: 'Online Fashion Store',
            amount: this.amount * 100
        });
    }

    // Paypal Payment Gateway
    isShowLocation = false;
    frais = 0;

    private initConfig(): void {
        this.payPalConfig = {
            currency: this.productService.Currency.currency,
            clientId: environment.paypal_token,
            createOrderOnClient: (data) => <ICreateOrderRequest> {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: this.productService.Currency.currency,
                        value: this.amount,
                        breakdown: {
                            item_total: {
                                currency_code: this.productService.Currency.currency,
                                value: this.amount
                            }
                        }
                    }
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                size: 'small', // small | medium | large | responsive
                shape: 'rect', // pill | rect
            },
            onApprove: (data, actions) => {
                // this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal, this.frais);
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });
            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            }
        };
    }

    choiceShipping(shipping: IShipping, index: number) {
        this.shippings.map(i => i.hideme = false);
        this.shippings[index].hideme = true;
        this.frais = this.shippings[index].frais;
        this.configShipping = this.shippings[index];
    }

    isPlace = true;
    isD17 = false;
    isTrait = false;

    changeConfigPayment(item: any) {
        if (item.isBankTransfert) {
            this.isTrait = true;
            this.isPlace = false;
            this.isD17 = false;
        }
        if (item.isD17) {
            this.isTrait = false;
            this.isPlace = false;
            this.isD17 = true;
        }
        if (item.isCash) {
            this.isTrait = false;
            this.isPlace = true;
            this.isD17 = false;
        }

    }

    amountFac = '';
    pdfGen: any;

    convertAmoutToWords(num: any): void {
        this.amountFac = this.translateApiService.number2text(num);
    }

    onDownload(billOperation) {
        const num = (billOperation.totalAPayer).toFixed(3);

        this.convertAmoutToWords(num);
        return this.generatePDF(billOperation);
    }

    generatePDF(billOperation: IBillOperationEshop) {
        const isRip = true;
        const isEmail = true;
        const isPhone = true;
        const isLogo = true;
        const isTva = true;
        const isAddress = true;


        let note = '';
        if (billOperation.note) {
            note = billOperation.note;
        }
        let bankConfig = '';
        let bank: any;
        if (isRip) {
            if (localStorage.getItem('bankConfig')) {
                bank = JSON.parse(localStorage.getItem('bankConfig'));
                bankConfig = '- RIP: ' + bank.rib;
            }
        }


        let address = '';
        if (billOperation.address) {
            address = billOperation.address;
        }


        let invoice = '';
        let stop = '';
        invoice = this.translate.instant('bill-operation.print.num.command');
        stop = this.translate.instant('bill-operation.print.stop.command');
        const phone = this.translate.instant('bill-operation.print.phone');

        let url = '';

        const font = environment.fontA;
        const doc = new jsPDF('p', 'pt', 'a4');
        doc.addFileToVFS('Amiri-Regular.ttf', font);
        doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
        doc.setFont('Amiri'); // set font
        doc.setFontSize(20);
        if (localStorage.getItem('lang') === 'ar') {
            doc.setLanguage('ar-SA');
            doc.setLanguage('ar');
        }
        const testText = invoice + ' :  ' + billOperation.id.slice(0, 18);
        const testText1 = this.translate.instant('bill-operation.form.date') + ': ' + this.datePipe.transform(billOperation.date, 'yyyy-MM-dd');
        doc.text(testText, 330, 30);
        doc.text(testText1, 330, 60);
        if (url) {
            if (isLogo) {
                doc.addImage(url, 'png', 40, 10, 102, 70);
            }

        }
        doc.line(40, 90, 560, 90); // horizontal line
        autoTable(doc, {
            styles: {font: 'Amiri', fontSize: 16},
            startY: 95,
            margin: {
                left: 40
            },
            columnStyles: {
                0: {cellWidth: 55, textColor: 0, fontSize: 12},
                1: {cellWidth: 200, fontSize: 12}
            },
            body: [
                [this.translate.instant('global.customerName'), billOperation.clientName],
                [phone, billOperation.phone],
                [this.translate.instant('global.company'), address],

            ],
            theme: 'grid',
            tableLineColor: [255, 255, 255],
            bodyStyles: {lineColor: [255, 255, 255]}

        });
        autoTable(doc, {
            // styles: {font: 'Amiri', fontSize: 12, halign: 'right', lineColor: 1, lineWidth: 1},
            styles: {font: 'Amiri', fontSize: 12},
            // headStyles: {fillColor: [128, 128, 128]},
            startY: (doc as any).lastAutoTable.finalY + 10,
            columnStyles: {
                0: {cellWidth: 70},
                1: {cellWidth: 160},
                2: {cellWidth: 70},
                3: {cellWidth: 90},
                4: {cellWidth: 50},
                5: {cellWidth: 90},
            },
            headStyles: {fillColor: [102, 102, 102]},
            head: [[
                this.translate.instant('global.code'),
                this.translate.instant('global.designation'),
                this.translate.instant('global.qty'),
                this.translate.instant('global.PU'),
                this.translate.instant('bill-operation.form.code_tva'),
                this.translate.instant('bill-operation.form.HT'),
            ]],
            body: [
                ...billOperation.billOperationItemEshops.map(p => [
                    p.item.reference,
                    p.item.name,
                    p.quantity,
                    (p.totalHT / p.quantity).toFixed(3),
                    p.tva,
                    p.totalHT.toFixed(3),

                ]),
            ],
            theme: 'striped',
            tableWidth: 'auto',

        });
        const y = (doc as any).lastAutoTable.finalY + 10;
        autoTable(doc, {
            styles: {font: 'Amiri', fontSize: 12, overflow: 'linebreak'},
            margin: {left: 320},
            startY: (doc as any).lastAutoTable.finalY + 11,
            columnStyles: {
                0: {cellWidth: 100, fillColor: [245, 245, 245], textColor: [0, 0, 0]},
                1: {cellWidth: 140},
            },
            body: [
                [this.translate.instant('bill-operation.form.HT'), billOperation.totalHT.toFixed(3) + ' ' + this.translate.instant('TND')],
                [this.translate.instant('bill-operation.form.total.tva'), (billOperation.totalTTC - billOperation.totalHT).toFixed(3) + ' ' + this.translate.instant('TND')],
                [this.translate.instant('bill-operation.form.TTC'), billOperation.totalTTC.toFixed(3) + ' ' + this.translate.instant('TND')],
                [this.translate.instant('bill-operation.form.net'), billOperation.totalAPayer.toFixed(3) + ' ' + this.translate.instant('TND')],
            ],
            theme: 'grid',

        });

        autoTable(doc, {
            styles: {font: 'Amiri', fontSize: 16},
            startY: (doc as any).lastAutoTable.finalY + 100,
            margin: {
                left: 40,
            },
            columnStyles: {
                0: {cellWidth: 512, textColor: 0, fontSize: 14},

            },
            body: [
                [stop],
                [this.amountFac]
            ],
            theme: 'grid',
            tableLineColor: [255, 255, 255],
            bodyStyles: {lineColor: [255, 255, 255]}

        });
        autoTable(doc, {
            styles: {font: 'Amiri', fontSize: 50},
            startY: (doc as any).lastAutoTable.finalY + 50,
            margin: {
                left: 40,
            },
            columnStyles: {
                0: {cellWidth: 250, textColor: 0, fontSize: 14, halign: 'center'},
                1: {cellWidth: 250, textColor: 0, fontSize: 14, halign: 'center'},

            },
            body: [
                [this.translate.instant('global.signature'), this.translate.instant('notes')],
                [' ', note]
            ],
            theme: 'grid',
            tableLineColor: [255, 255, 255],
            bodyStyles: {lineColor: [255, 255, 255]}

        });
        const pages = doc.getNumberOfPages();
        doc.setFontSize(10);
        for (let j = 1; j < pages + 1; j++) {
            doc.setPage(j);
            let phone1 = '';
            if (isPhone) {
                phone1 = ' - ' + phone + ': ' + this.phone;
            }
            let email1 = '';
            if (isEmail) {
                email1 = '  - '
                    + this.translate.instant('bill-operation.print.email') + ': ' + this.e_mail;
            }

            let addresss = '';
            if (isAddress) {
                addresss = this.adresse;
            }

            const str = addresss
                + phone1 + email1;
            doc.setFontSize(10);
            doc.text(str, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 25, {align: 'center'}); // key is the interal pageSize function
            doc.setDrawColor(0, 0, 0);  // draw red lines
            doc.line(30, doc.internal.pageSize.height - 35, 560, doc.internal.pageSize.height - 35); // horizontal line
            const stra = this.translate.instant('tiers.form.Code TVA') + ' : ' + this.commercialRegister;
            doc.setFontSize(10);
            let positiontva = 218;
            if (bankConfig === '') {
                positiontva = doc.internal.pageSize.width / 2;
            }
            if (isTva) {
                doc.text(stra, positiontva, doc.internal.pageSize.height - 15, {align: 'center'});
            }

            const strB = bankConfig;
            doc.text(strB, 320, doc.internal.pageSize.height - 15, {align: 'center'});
        }
        // doc.save(  "command-" + billOperation.reference + '.pdf');
        return doc.output('blob');

    }

    save() {
        const startDat = this.year + '-' + ('00' + this.month).slice(-2) + '-' +
            ('00' + this.day).slice(-2) + ' ' + ('00' + this.HH).slice(-2) + ':' +
            ('00' + this.mm).slice(-2) + ':00';
        const paymentEshop = {
            amount: Number(this.amount),
            paymentDate: startDat,
            bank: '',
            transferInformation: '',
            avatar: null,
            imageJustif: null,
            isCash: this.paymentEshopConfig.isCash,
            isD17: this.paymentEshopConfig.isD17,
            isCard: this.paymentEshopConfig.isCard,
            isBankTransfert: this.paymentEshopConfig.isBankTransfert,
        };
        const pdfUrl = 'commande.pdf';
        const avatarPdf = null;

        const billOperationItems = [];
        let totalHT = 0;
        for (let i = 0; i < this.products.length; i++) {
            const item = {
                id: undefined,
                unitPrice: this.products[i].item.returnedPrice,
                quantity: this.products[i].quantity,
                discountRate: 0,
                tva: this.products[i].item.tva,
                totalHT: (this.products[i].item.returnedPrice * this.products[i].quantity) / (1 + (this.products[i].item.tva / 100)),
                totalTTC: this.products[i].item.returnedPrice * this.products[i].quantity,
                item: this.products[i].item,
            };
            totalHT = totalHT + (this.products[i].item.returnedPrice * this.products[i].quantity) / (1 + (this.products[i].item.tva / 100));
            billOperationItems.push(item);
        }
        const command: IBillOperationEshop = {
            id: uuid.v4(),
            reference: this.reference,
            totalHT,
            totalTTC: this.amount,
            totalAPayer: this.amount + this.frais,
            billOperationItemEshops: billOperationItems,
            clientId: this.account.id,
            clientName: this.account.firstName + ' ' + this.account.lastName,
            phone: this.account.phone,
            email: this.account.email,
            address: this.location,
            status: 'DRAFT',
            date: startDat,
            dueDate: startDat,
            isPanier: false,
            isInvoice: false,
            isCommand: true,
            shippingConfig: this.configShipping,
            avatarPdf,
            pdf: pdfUrl,
            paymentEshop
        };
        const pdf = this.onDownload(command);
        const reader = new FileReader();
        reader.readAsDataURL(pdf);
        let avatar = '';
        reader.onloadend = () => {
            const base64data = reader.result;
            if (typeof base64data === 'string') {
                avatar = base64data.split(',')[1];
                command.pdf = 'command' + command.id + '.pdf';
                command.avatarPdf = avatar;
                this.basketService.create(command).subscribe(res => {
                    const items = [];
                    const lignes = res.body.billOperationItemEshops;

                    for (let i = 0; i <= lignes.length; i++) {
                        if (lignes[i]) {
                            const item = {
                                itemId: lignes[i].item.id,
                                quantity: lignes[i].quantity
                            };
                            items.push(item);
                        }
                    }
                    this.itemService.validateCommande(items).subscribe(() => {
                    this.orderService.createOrder(this.products, this.checkoutForm.value, command.id.slice(0,18), this.amount, this.frais, this.currentDate, this.delay);
                    });
                  });
            }
        };

    }
}
