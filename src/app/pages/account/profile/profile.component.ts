import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../../core/auth/account.service';
import {UserEshopService} from '../../../services/user-eshop.service';
import {LocationService} from '../../../services/location.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    UserInfoForm: FormGroup; // bootstrap validation form
    myAccount: Account;

    constructor(public formBuilder: FormBuilder,private toastrService: ToastrService,
                public accountService: AccountService, public location: LocationService,
                public userEshopService: UserEshopService, protected translate: TranslateService) {
    }

    breadCrumbItems: Array<{}>;

    // Form submition
    submit: boolean;
    formsubmit: boolean;
    typesubmit: boolean;
    account: any;

    ngOnInit(): void {
        this.createUserInfoForm();
        this.getUserInfoForm();

        // this.userEshopService.query().subscribe(value => {
        //     console.log(value);
        // });


    }

    createUserInfoForm() {
        this.UserInfoForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            phone: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            dateBirthday: ['', [Validators.required]],
            description: ['', [Validators.required]],
            zip: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
        });
        this.submit = false;
        this.formsubmit = false;
        this.typesubmit = false;
    }

    getUserInfoForm() {
        this.accountService.identity().subscribe(account => {
            if (account) {
                this.account = account;
                this.UserInfoForm.patchValue({
                    firstName: account.firstName,
                    lastName: account.lastName,
                    email: account.email,
                    phone: account.phone,
                    dateBirthday: account.dateBirthday,
                    description: account.description
                });
                this.location.query_pays().subscribe(res => {
                    this.pays = res.body[0];
                    this.payss = res.body;
                    this.governments =  this.pays.governments;
                    this.location.query_Delegations().subscribe(res2 => {
                        this.delegations_v2 = res2.body;
                        if(this.account.userEshopLocations[0]){
                            this.updateForm(this.account.userEshopLocations[0]);
                        } else {
                            this.updateForm(this.account.userEshopLocations);
                        }

                    });
                });
            }
        });
    }

    validSubmit() {
        this.account.firstName = this.UserInfoForm.get(['firstName'])!.value;
        this.account.lastName = this.UserInfoForm.get(['lastName'])!.value;
        this.account.email = this.UserInfoForm.get(['email'])!.value;
        this.account.phone = this.UserInfoForm.get(['phone'])!.value;
        this.account.dateBirthday = this.UserInfoForm.get(['dateBirthday'])!.value;
        this.account.description = this.UserInfoForm.get(['description'])!.value;
        this.account.userEshopLocations = [];
        this.account.userEshopLocations.push(this.createLocationForm());
        this.accountService.save(this.account).subscribe(value => {
            this.getUserInfoForm();
        });
        // this.accountService.update()
        this.formsubmit = true;
    }

    get form() {
        return this.UserInfoForm.controls;
    }

    get email() {
        return this.UserInfoForm.get('email');
    }

    get type() {
        return this.UserInfoForm.controls;
    }

    /**
     * Type validation form submit data
     */
    typeSubmit() {
        this.typesubmit = true;
    }

    /**
     *  Config Address
     */


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


    validSubmitLocations() {
        this.account.userEshopLocations = [];
        this.account.userEshopLocations.push(this.createLocationForm());
        if (this.idAddress === undefined) {
            this.location.create(this.createLocationForm()).subscribe(value => {
                this.onSave(value.body);
                // this.getUserAdressForm();
            });
        }
        if (this.idAddress !== undefined) {
            this.location.update(this.createLocationForm()).subscribe(value => {
                this.onSave(value.body);
                // this.getUserAdressForm();
            });
        }
    }


    /**
     * Type validation form submit data
     */


    onSave(event) {
        // this.emitterSave.emit(event);
        console.log('onSave', event);
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
        };
    }

    onValidate() {
        this.validSubmit();
        // this.validSubmitLocations();
        // this.toastrService.success(this.translate.instant('action.update_msg'));
    }
}
