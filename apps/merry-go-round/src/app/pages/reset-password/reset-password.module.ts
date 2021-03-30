import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { Material } from 'src/libs';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule, Material],
  exports: [ComponentsModule, Material],
})
export class ResetPasswordModule {}
