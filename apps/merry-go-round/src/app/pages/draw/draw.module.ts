import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawComponent } from './draw.component';

@NgModule({
  declarations: [],
  imports: [ComponentsModule, CommonModule],
  exports: [ComponentsModule],
})
export class DrawModule {}
