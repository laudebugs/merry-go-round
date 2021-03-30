import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { GraphQLModule } from '../../services/graphql/graphql.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule, GraphQLModule],
  exports: [ComponentsModule, GraphQLModule],
})
export class SignUpModule {}
