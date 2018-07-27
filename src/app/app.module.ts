import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './Pages/detail.component';
import { HomeComponent } from './Pages/home.component';
import { HttpModule } from '@angular/http';
import { ProductService } from './Services/product.service';
import { CartService } from './Services/cart.service';
import { CartComponent } from './Pages/cart.component';
import { LoginComponent } from './Pages/login.component';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { RegisterComponent } from './Pages/register.component';
import { AlertService } from './Services/alert.service';
import { AuthenticationService } from './Services/authentication.service';
import { UserService } from './Services/user.service';
import { AlertComponent } from './Pages/alert.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: AppComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    DetailComponent,
    HomeComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    )
  ],

  providers: [ProductService, CartService, AlertService, AuthenticationService, UserService],

  bootstrap: [AppComponent]
})

export class AppModule { }
