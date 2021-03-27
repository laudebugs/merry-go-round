import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { avatars } from 'src/app/components/avatar/avatars';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  forms: FormGroup;
  hide = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.forms = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  signUp() {
    this.openSnackBar('Signing you up', '✨');

    const user = {
      username: this.forms.get('username').value,
      email: this.forms.get('email').value,
      avatar: Math.floor(Math.random() * avatars.length),
    };
    this.authService.signUp(user).subscribe((data: any) => {
      this._snackBar.dismiss();
      const token = data.data.signup;
      if (token !== null) {
        localStorage.setItem('token', token);
        TODO: "Work on this - using 'ActivateRoute' and all.";
        this.authService
          .getUser(user.email)
          .valueChanges.subscribe((req: any) => {
            let user = req.data.getUser;
            if (!!user) {
              localStorage.setItem('username', user.username);
              localStorage.setItem('avatar', user.avatar);
              localStorage.setItem('email', user.email);
              this.router.navigateByUrl('ruf-coffee-house');
            }
          });
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
