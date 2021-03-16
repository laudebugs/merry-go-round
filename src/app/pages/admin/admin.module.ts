import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule],
  exports: [ComponentsModule],
})
export class AdminModule {}
