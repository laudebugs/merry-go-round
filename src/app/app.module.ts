import { DrawComponent } from './pages/draw/draw.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/pages/sign-up/sign-up.component';
import { Material } from 'src/libs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthService } from './services/auth/auth.service';
import { BidService } from './services/bid/bid.service';
import { GraphQLModule } from './services/graphql/graphql.module';
import { ProductService } from './services/product/product.service';
import { NgxWheelModule } from 'ngx-wheel'; //<-- import here

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    DrawComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Material,
    BrowserAnimationsModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GraphQLModule,
    AngularStickyThingsModule,
  ],
  exports: [Material, NgxWheelModule],
  providers: [AuthService, ProductService, BidService],
  bootstrap: [AppComponent],
})
export class AppModule {}
