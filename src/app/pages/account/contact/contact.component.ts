import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HomeService} from '../../../services/home.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  submit: boolean;
  validationform: FormGroup;
  streetAddress = '';
  postalCode = '';
  city = '';
  stateProvince = '';
  countryName = '';

  codePhone1 = '';
  phone1 = '';
  codePhone2 = '';
  phone2 = '';
  email = '';
  schemaName;

  constructor(public formBuilder: FormBuilder, public homeService: HomeService) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'HOME.breadCrumb.HOME'}, {label: 'HOME.breadCrumb.CONTACTUS2', active: true}];
    const url = window.location.href;
    this.schemaName = localStorage.getItem('schemaName');
    if (this.schemaName !== null) {
      this.homeService.queryContact(this.schemaName).subscribe(value => {
        this.streetAddress = value[0].companyLocation?.streetAddress;
        this.postalCode = value[0].companyLocation?.postalCode;
        this.city = value[0].companyLocation?.city;
        this.stateProvince = value[0].companyLocation?.stateProvince;
        this.countryName = value[0].companyLocation?.countryName;
        this.codePhone1 = value[0].codePhone1;
        this.codePhone2 = value[0].codePhone2;
        this.phone1 = value[0].phone1;
        this.phone2 = value[0].phone2;
        this.email = value[0].email1;

      });
    }


    /*this.slideService.findByUrl(url.slice(numberSchema, (url.length))).subscribe(res => {
      let schemaName = null;
      if (res) {
        localStorage.setItem('schemaName', res.schemaName);
        schemaName = localStorage.getItem('schemaName');
      }
      // call the Slider Service


    });*/

    /**
     * Bootstrap validation form data
     */
    this.validationform = this.formBuilder.group({
      subject: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    });
  }

  /**
   *  validation form data
   */


  validSubmit() {
    this.submit = true;
    console.log(this.validationform.value);
  }

  get form() {
    return this.validationform.controls;
  }
}
