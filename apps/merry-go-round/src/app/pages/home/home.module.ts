import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule, AngularStickyThingsModule],
  exports: [ComponentsModule],
})
export class HomeModule {}
