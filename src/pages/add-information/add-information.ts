import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DlsclaimerPage } from '../dlsclaimer/dlsclaimer';
import { CommonProvider } from '../../providers/common/common';
import { ResponseStatus } from '../../constants/response-status.constain';
import { Observable } from 'rxjs';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the AddInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-information',
  templateUrl: 'add-information.html',
})
export class AddInformationPage {
  registerForm: any;
  countries: any = [];
  healthChecklist: any = [];
  selectedHealthChecklist = [];
  displaySpecifyHealthChecklist: boolean = false;

  weightUnits: any = [
    'Kilograms', 'Grams'
  ];

  heightUnits: any = [
    'Centimetres', 'Metres'
  ];

  ionViewDidLoad() {
    this.registerForm.patchValue({
      weightUnit: this.weightUnits[0],
      heightUnit: this.heightUnits[0]
    });
    this.bindFormData();
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private commonProvider: CommonProvider,
    private loading: LoadingProvider
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      dateOfBirth: [Date.now(), Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      weight: ['', Validators.required],
      weightUnit: ['', Validators.required],
      height: ['', Validators.required],
      heightUnit: ['', Validators.required],
      health: [false, Validators.required],
      specifyHealth: [''],
      specifyHealthChecklist: [''],
      temp: [false, Validators.required]
    }, {
        validator: [
          this.matchingPasswords('password', 'confirmPassword'),
        ]
      },
    );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  healthCheck(id) {
    let index = this.selectedHealthChecklist.findIndex(i => i === id);
    if (index > -1) {
      this.selectedHealthChecklist = this.selectedHealthChecklist.splice(index-1, 1);
      if (id == 0) {
        this.displaySpecifyHealthChecklist = false;
        this.registerForm.patchValue({
          specifyHealthChecklist: ''
        });
      }
    } else {
      this.selectedHealthChecklist.push(id);
      if (id == 0) {
        this.displaySpecifyHealthChecklist = true;
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    return (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  register(form) {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }
    var model = {
      firstName: form.firstname,
      surName: form.surname,
      email: form.email,
      password: form.password,
      dateOfBirth: form.dateOfBirth,
      country: form.country,
      city: form.city,
      contactNumber: form.contactNumber,
      weight: form.weight,
      height: form.height,
      UnitOfWeight: form.weightUnit,
      UnitOfHeight: form.heightUnit,
      healthMedication: form.specifyHealth,
      "healthId": "4E56B8B2-FA06-4981-99BE-135866B92983",
      otherIllnesses: form.specifyHealthChecklist,
      selectedHealthChecklist: this.selectedHealthChecklist
    }
    this.navCtrl.push(DlsclaimerPage, { model: model });
  }

  bindFormData() {
    let countriesObs = this.commonProvider.getCountries();
    let healthChecklistObs = this.commonProvider.getHealthChecklist();
    this.loading.showLoading();
    Observable.zip(countriesObs, healthChecklistObs).subscribe(res => {
      this.loading.hideLoading();
      let countriesRes = res[0];
      let healthChecklistRes = res[1];
      if (countriesRes['status'] === ResponseStatus.success) {
        this.countries = countriesRes['data'];
        if (this.countries.length) {
          this.registerForm.patchValue({
            country: this.countries[0].Id
          });
        }
      }

      if (healthChecklistRes['status'] === ResponseStatus.success) {
        this.healthChecklist = healthChecklistRes['data'];
      }
    }, err => {
      this.loading.hideLoading();
    });
  }
}
