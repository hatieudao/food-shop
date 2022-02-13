import { OrdersModule } from "./orders/orders.module";
import { ProductsModule } from "./products/products.module";
import { AdminModule } from "./admin/admin.module";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { LoginComponent } from './components/login/login.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HotToastModule } from '@ngneat/hot-toast';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SharedModule } from "shared/shared.module";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FoodModule } from "./food/food.module";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    
    ShoppingCartComponent,
    OrderSuccessComponent,
    LoginComponent,
    CheckOutComponent,
    NotFoundComponent,
    MyOrderComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    AdminModule,
    ProductsModule,
    FoodModule,
    OrdersModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    HotToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
