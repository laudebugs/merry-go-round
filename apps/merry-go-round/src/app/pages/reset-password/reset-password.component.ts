import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email!: FormControl;
  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }
  submit() {
    this.openSnackBar('Sending Password Reset Request', '...');
    this.authService.resetPassword(this.email.value).subscribe((data: any) => {
      console.log(data);
      this.snackBar.open('Check your email ', '📧');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
