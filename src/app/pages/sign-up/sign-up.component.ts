import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}
