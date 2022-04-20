import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { tafqeet} from '../shared/currency/Tafqeet';
@Injectable({
    providedIn: 'root'
})
export class TranslateApiService {

    constructor(private translateService: TranslateService) {

        // const languageKey = sessionStorage.getItem('locale');
        //
        // this.translateService.use(languageKey);
    }


// version french

    number2text(value: number): string {
        const languageKey = this.translateService.getDefaultLang();
        //
        // this.translateService.use(languageKey);


        let ch = '';
        const devise = JSON.parse(localStorage.getItem('devise'));
        // const devise = {
        //     decimalDigits: 3,
        //     code : 'TND',
        //     currenceUnitName : "TND"
        // };
        let fraction = 0;
        // devise.decimalDigits = 3;
        // devise.code = 'TND';
        if (devise.decimalDigits === 3) {
            fraction = Math.round(this.frac(value) * 1000);
        } else if (devise.decimalDigits === 2) {
            fraction = Math.round(this.frac(value) * 100);
        }
        // eslint-disable-next-line @typescript-eslint/camelcase
        let f_text = '';

        if (devise.code === 'TND') {
            if (languageKey === 'ar') {
                // // ch = new Tafgeet(value, 'TND').parse();
                if (fraction > 0) {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    f_text = tafqeet(fraction) + '  مليماً '  ;
                }

                // eslint-disable-next-line @typescript-eslint/camelcase
                ch = tafqeet(value) + '  دينار تونسي و' +    f_text  ;


            }

            if (languageKey === 'fr') {

                if (fraction > 0) {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    f_text = 'ET ' + this.convert_number(fraction) + ' MILLIMES ';
                }

                // eslint-disable-next-line @typescript-eslint/camelcase
                ch = this.convert_number(value) + ' DINAR TUNISIEN ' + f_text + ' ';

            }

            if (languageKey === 'en') {
                if (fraction > 0) {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    f_text = 'AND ' + this.convert_number_EN(fraction) + ' MILLIMES ';
                }

// eslint-disable-next-line @typescript-eslint/camelcase
                ch = this.convert_number_EN(value) + ' TUNISIAN DINAR ' + f_text + ' ';

            }
        } else {
            if (languageKey === 'ar') {
                // // ch = new Tafgeet(value, 'TND').parse();
                if (fraction > 0) {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    f_text = tafqeet(fraction) + '   '  ;
                }

                // eslint-disable-next-line @typescript-eslint/camelcase
                ch = tafqeet(value) + '  و' +    f_text  ;

            }

            if (languageKey === 'fr') {

                if (fraction > 0) {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    f_text = 'ET ' + this.convert_number(fraction) + ' ';
                }

                // eslint-disable-next-line @typescript-eslint/camelcase
                ch = this.convert_number(value) + ' ' + devise.currenceUnitName + ' ' + f_text + ' ';

            }

            if (languageKey === 'en') {
                if (fraction > 0) {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    f_text = 'AND ' + this.convert_number_EN(fraction) + '  ';
                }
                ch = this.convert_number_EN(value) + ' ' + devise.currenceUnitName + ' ' + f_text + ' ';

            }
        }


        return ch;


    }

    frac(f: number): number {
        return f % 1;
    }

    convert_number(number: number): string {
        if ((number < 0) || (number > 999999999)) {
            return 'NUMBER OUT OF RANGE!';
        }
        const Gn = Math.floor(number / 10000000);  /* Crore */
        number -= Gn * 10000000;
        const kn = Math.floor(number / 100000);     /* lakhs */
        number -= kn * 100000;
        const Hn = Math.floor(number / 1000);      /* thousand */
        number -= Hn * 1000;
        const Dn = Math.floor(number / 100);       /* Tens (deca) */
        number = number % 100;               /* Ones */
        const tn = Math.floor(number / 10);
        const one = Math.floor(number % 10);
        let res = '';

        if (Gn > 0) {
            res += (this.convert_number(Gn) + ' ');
        }
        if (kn > 0) {
            res += (((res === '') ? '' : ' ') +
                this.convert_number(kn) + ' ');
        }
        if (Hn > 0) {
            res += (((res === '') ? '' : ' ') +
                this.convert_number(Hn) + ' MILLE');
        }

        if (Dn) {
            res += (((res === '') ? '' : ' ') +
                this.convert_number(Dn) + ' CENT');
        }


        const ones = ['', 'UN', 'DEUX', 'TROIX', 'QUATRE', 'CINQ', 'SIX', 'SEPT', 'HUIT', 'NEUF', 'DIX', 'ONZE', 'DOUZE', 'TREIZE', 'QUATROZE', 'QUINZE', 'SEIZE', 'DIX-SEPT', 'DIX-HUIT', 'DIX-NEUF'];
        const tens = ['', '', 'VINGT', 'TRENTE', 'QUARANTE', 'CINQUANTE', 'SOIXANTE', 'SOIXANTE-DIX', 'QUATRE-VINGTS', 'QUATRE-VINGT-DIX'];

        if (tn > 0 || one > 0) {
            if (!(res === '')) {
                res += ' ET ';
            }
            if (tn < 2) {
                res += ones[tn * 10 + one];
            } else {

                res += tens[tn];
                if (one > 0) {
                    res += ('-' + ones[one]);
                }
            }
        }

        if (res === '') {
            res = 'zéro';
        }
        return res;
    }


    // eslint-disable-next-line @typescript-eslint/camelcase
    convert_number_EN(number: number): string {
        if ((number < 0) || (number > 999999999)) {
            return 'NUMBER OUT OF RANGE!';
        }
        const Gn = Math.floor(number / 10000000);  /* Crore */
        number -= Gn * 10000000;
        const kn = Math.floor(number / 100000);     /* lakhs */
        number -= kn * 100000;
        const Hn = Math.floor(number / 1000);      /* thousand */
        number -= Hn * 1000;
        const Dn = Math.floor(number / 100);       /* Tens (deca) */
        number = number % 100;               /* Ones */
        const tn = Math.floor(number / 10);
        const one = Math.floor(number % 10);
        let res = '';

        if (Gn > 0) {
            res += (this.convert_number_EN(Gn) + ' ');
        }
        if (kn > 0) {
            res += (((res === '') ? '' : ' ') +
                this.convert_number_EN(kn) + ' ');
        }
        if (Hn > 0) {
            res += (((res === '') ? '' : ' ') +
                this.convert_number_EN(Hn) + ' THOUSAND');
        }

        if (Dn) {
            res += (((res === '') ? '' : ' ') +
                this.convert_number_EN(Dn) + ' HUNDRED');
        }


        const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
        const tens = ['', '', 'TWENTY', 'THIRTY', 'FOURTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];

        if (tn > 0 || one > 0) {
            if (!(res === '')) {
                res += ' AND ';
            }
            if (tn < 2) {
                res += ones[tn * 10 + one];
            } else {

                res += tens[tn];
                if (one > 0) {
                    res += ('-' + ones[one]);
                }
            }
        }

        if (res === '') {
            res = 'zero';
        }
        return res;
    }

    convert_number_ar(number: number): string {
        if ((number < 0) || (number > 999999999)) {
            return 'NUMBER OUT OF RANGE!';
        }
        const Gn = Math.floor(number / 10000000);  /* Crore */
        number -= Gn * 10000000;
        const kn = Math.floor(number / 100000);     /* lakhs */
        number -= kn * 100000;
        const Hn = Math.floor(number / 1000);      /* thousand */
        number -= Hn * 1000;
        const Dn = Math.floor(number / 100);       /* Tens (deca) */
        number = number % 100;               /* Ones */
        const tn = Math.floor(number / 10);
        const one = Math.floor(number % 10);
        let res = '';

        if (Gn > 0) {
            res += (this.convert_number_ar(Gn) + ' ');
        }
        if (kn > 0) {
            res += (((res === '') ? '' : ' ') +
                this.convert_number_ar(kn) + ' ');
        }
        if (Hn > 0) {
            res += (((res === '') ? '' : ' ') +
                this.convert_number_ar(Hn) + ' ألف ');
        }

        if (Dn) {
            res += (((res === '') ? '' : ' ') +
                this.convert_number_ar(Dn) + ' مائة ');
        }
        const ones = ['', 'واحد', 'ٱثنين', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة', 'عشرة', 'أحد عشر', 'أثني عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
        const tens = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];

        if (tn > 0 || one > 0) {
            if (!(res === '')) {
                res += ' و ';
            }
            if (tn < 2) {
                res += ones[tn * 10 + one];
            } else {

                res += tens[tn];
                if (one > 0) {
                    res += (  ' و '  + ones[one]  );
                }
            }
        }

        if (res === '') {
            res = 'صفر';
        }
        return res;
    }

}
