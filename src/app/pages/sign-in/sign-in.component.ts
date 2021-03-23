import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Credentials } from './../../services/types';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  // For the password
  hide = true;
  loading = false;
  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {}

  submit() {
    this.openSnackBar('Logging in', '🤹');
    this.loading = true;
    const email = this.form.get('email').value;
    const pass = this.form.get('password').value;
    this.authService
      .signIn(new Credentials(email, pass))
      .subscribe((res: any) => {
        this.loading = false;
        this._snackBar.dismiss();
        const token = res.data.signin;

        if (token !== null) {
          localStorage.setItem('token', token);
          TODO: "Work on this - using 'ActivateRoute' and all.";
          console.log(email);
          this.authService.getUser(email).valueChanges.subscribe((req: any) => {
            console.log(req);
            let user = req.data.getUser;
            console.log(user);
            localStorage.setItem('username', user.username);
            localStorage.setItem('email', user.email);
            localStorage.setItem('avatar', user.avatar);
            this.router.navigateByUrl('ruf-coffee-house');
          });
        }
      });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
