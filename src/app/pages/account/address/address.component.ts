import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../../../core/auth/account.service';
import {LocationService} from '../../../services/location.service';


@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
    // tslint:disable-next-line:no-output-rename
    @Output('onSave') emitterSave = new EventEmitter();

    // Form submition
    UserAdressForm: FormGroup;
    submit: boolean;
    formsubmit: boolean;
    typesubmit: boolean;
    account: any;

    // For Contry Form
    pays = null;
    stateProvince = null;
    city = null;
    payss = [];
    governments = [];
    delegations = [];
    delegations_v2 = [];
    id: number;
    idAddress;


    constructor(public formBuilder: FormBuilder, public accountService: AccountService, public location: LocationService) {
    }

    ngOnInit(): void {

        this.createUserInfoForm();
        this.location.query_pays().subscribe(res => {
            this.pays = res.body[0];
            this.payss = res.body;
            this.governments = this.pays.governments;
            this.location.query_Delegations().subscribe(res2 => {
                this.delegations_v2 = res2.body;
                this.getUserAdressForm();
            });
        });


    }


    createUserInfoForm() {
        this.UserAdressForm = this.formBuilder.group({
            /*email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],*/
            /* phone: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
             phone2: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],*/
            /* birthDay: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],*/
            /* description: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],*/
        });
        this.submit = false;
        this.formsubmit = false;
        this.typesubmit = false;
    }

    addressCompanyForm = this.formBuilder.group({
        localNumber: ['', null],
        streetAddress: ['', null],
        postalCode: ['', null],
        city: [null],
        stateProvince: [null],
        countryName: ['TUNISIE'],
    });

    showGovDel() {
        if (this.pays === null || this.pays.name !== 'TUNISIE') {

            this.stateProvince = null;
            this.city = null;
            this.pays = null;
        }
    }

    changeCity() {
        this.delegations_v2 = this.stateProvince.delegations;
    }

    getUserAdressForm() {

        this.accountService.identity().subscribe(account => {
            if (account) {

                this.account = account;
                // console.log('mylocationId', this.account.userEshopLocations[0].id);
                // this.idAddress = this.account.userEshopLocations[0].id;
                this.UserAdressForm.patchValue({});
                this.updateForm(this.account.userEshopLocations[0]);
                // this.onSave(this.account.userEshopLocations[0]);
            }
        });
    }


    validSubmit() {
        this.account.userEshopLocations = [];
        this.account.userEshopLocations.push(this.createLocationForm());
        if (this.idAddress === undefined) {
            this.location.create(this.createLocationForm()).subscribe(value => {
                this.onSave(value.body);
                this.getUserAdressForm();
            });
        }
        if (this.idAddress !== undefined) {
            this.location.update(this.createLocationForm()).subscribe(value => {
                this.onSave(value.body);
                this.getUserAdressForm();
            });
        }
        /*this.account.firstName = this.UserInfoForm.get(['firstName'])!.value;
        this.account.lastName = this.UserInfoForm.get(['lastName'])!.value;
        this.account.email = this.UserInfoForm.get(['email'])!.value;
        this.account.phone = this.UserInfoForm.get(['phone'])!.value;
        console.log(this.account);
        this.accountService.save(this.account).subscribe(value => {
          this.getUserInfoForm();
        });
        // this.accountService.update()
        this.formsubmit = true;*/
    }

    get form() {
        return this.UserAdressForm.controls;
    }

    get email() {
        return this.UserAdressForm.get('email');
    }

    get type() {
        return this.UserAdressForm.controls;
    }

    /**
     * Type validation form submit data
     */
    typeSubmit() {
        this.typesubmit = true;
    }

    onSave(event) {
       this.emitterSave.emit(event);
        console.log('onSave');
    }

    updateForm(accountEshop: any) {
        if (accountEshop) {
            if (accountEshop.countryName === 'TUNISIE') {
                this.pays = this.payss[0];
                this.delegations = this.delegations_v2;
                const itemCity = this.delegations_v2.filter(function(item) {
                    return item.name === accountEshop.city;
                });
                this.stateProvince = this.governments.filter(function(item) {
                    return item.name === accountEshop.stateProvince;
                });
                this.stateProvince = this.stateProvince[0];
                this.city = itemCity[0];
            } else {
                this.pays = null;
                // this.addressTiers = companyConfig.companyLocation.streetAddress + ' ' + companyConfig.companyLocation.postalCode;
            }
            this.idAddress = accountEshop.id;
            this.addressCompanyForm.patchValue({
                id: accountEshop.id,
                localNumber: accountEshop.localNumber,
                streetAddress: accountEshop.streetAddress,
                postalCode: accountEshop.postalCode,
                city: this.city,
                stateProvince: this.stateProvince,
                countryName: this.pays,
            });
        }
    }

    createLocationForm(): any {
        let stateProv = '';
        let cityy = '';
        const pay = 'TUNISIE';
        if (this.stateProvince) {
            stateProv = this.addressCompanyForm.get(['stateProvince'])!.value.name;
        }
        if (this.city) {
            cityy = this.addressCompanyForm.get(['city'])!.value.name;
        }
        // if (this.pays) {
        //   pay = this.addressCompanyForm.get(['countryName'])!.value.name;
        // }
        return {
            id: this.idAddress,
            localNumber: this.addressCompanyForm.get(['localNumber'])!.value,
            streetAddress: this.addressCompanyForm.get(['streetAddress'])!.value,
            postalCode: this.addressCompanyForm.get(['postalCode'])!.value,
            city: cityy,
            stateProvince: stateProv,
            countryName: pay,
            user: {
                id: this.account.id
            }
            // flagContentType:  this.addressCompanyForm.get(['flagContentType'])!.value,
            // flag:  this.addressCompanyForm.get(['flag'])!.value,
        };
    }

}
