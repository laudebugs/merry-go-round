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
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {}

  submit() {
    this.openSnackBar('Logging in', '🤹');
    this.loading = true;
    const user = this.form.get('username').value;
    const pass = this.form.get('password').value;
    this.authService
      .signIn(new Credentials(user, pass))
      .subscribe((res: any) => {
        this.loading = false;
        this._snackBar.dismiss();
        const token = res.data.signin;
        if (token !== null) {
          localStorage.setItem('token', token);
          TODO: "Work on this - using 'ActivateRoute' and all.";

          this.authService.getUser(user).valueChanges.subscribe((req: any) => {
            let user = req.data.getUser;
            localStorage.setItem('username', user.username);
            localStorage.setItem('avatar', user.avatar);
            localStorage.setItem('email', user.email);
            this.router.navigateByUrl('');
          });
        }
      });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
