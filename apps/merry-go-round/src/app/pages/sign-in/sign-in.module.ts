import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule],
  exports: [ComponentsModule],
})
export class SignInModule {}
