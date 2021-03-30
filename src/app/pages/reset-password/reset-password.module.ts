import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { Material } from '../../../libs';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule, Material],
  exports: [ComponentsModule, Material],
})
export class ResetPasswordModule {}
