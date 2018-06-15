import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DlsclaimerPage } from '../dlsclaimer/dlsclaimer';
import { CommonProvider } from '../../providers/common/common';
import { ResponseStatus } from '../../constants/response-status.constain';

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

  weightUnits: any = [
    'Kilograms', 'Grams'
  ];

  heightUnits: any = [
    'Centimetres', 'Metres'
  ];

  healthChecklist = [
    {
      id: 1,
      label: 'Stroke'
    },
    {
      id: 2,
      label: 'Heart Condition'
    },
    {
      id: 3,
      label: 'Hypertension'
    },
    {
      id: 4,
      label: 'Diabetes'
    },
    {
      id: 5,
      label: 'Pregnant'
    },
    {
      id: 6,
      label: 'Breastfeeding'
    },
    {
      id: 7,
      label: 'Other illnesses'
    }
  ];
  selectedHealthChecklist = [];
  
  ionViewDidLoad() {
    this.registerForm.patchValue({
      weightUnit: this.weightUnits[0],
      heightUnit: this.heightUnits[0]
    });
    this.bindFormData();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private commonProvider: CommonProvider) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      weight: ['', Validators.required],
      weightUnit: ['', Validators.required],
      height: ['', Validators.required],
      heightUnit: ['', Validators.required],
      health: [false, Validators.required],
      specifyHealth: ['', Validators.required],
      specifyHealthChecklist: ['', Validators.required],
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
      this.selectedHealthChecklist = this.selectedHealthChecklist.splice(index, 1);
    } else {
      this.selectedHealthChecklist.push(id);
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
      UnitOfHeight : form.heightUnit,
      healthMedication: form.specifyHealth,
      "healthId": "4E56B8B2-FA06-4981-99BE-135866B92983",
      otherIllnesses: form.specifyHealthChecklist,
      selectedHealthChecklist: this.selectedHealthChecklist
    }
    this.navCtrl.push(DlsclaimerPage, { model: model });
  }

  bindFormData() {
    this.getCountries();
  }

  getCountries() {
    this.commonProvider.getCountries().subscribe(res => {
      if (res['status'] === ResponseStatus.error) {
        return;
      }
      this.countries = res['data'];
      if (this.countries.length) {
        this.registerForm.patchValue({
          country: this.countries[0].Id
        });
      }
    })
  }
}
