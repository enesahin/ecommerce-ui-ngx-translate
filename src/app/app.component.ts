import { Component } from '@angular/core';
import { Cart } from './Models/Cart';
import { CartService } from './Services/cart.service';
import { AuthenticationService } from './Services/authentication.service';
import { AlertService } from './Services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cartList: Cart[];

  constructor(private cartService: CartService,
    public authenticationService: AuthenticationService,
    private alertService: AlertService,
    public translate: TranslateService,
    private router: Router) {

    if (localStorage.getItem("PrefLang") == undefined) {
      console.log("if giriş");
      
      let language = (navigator.language.indexOf('-') != -1) ? navigator.language.substring(0, navigator.language.indexOf('-')) : navigator.language;
      language = language.toUpperCase();
      localStorage.setItem("PrefLang", language);

      console.log(language);
      
    }
    let prefLang = localStorage.getItem("PrefLang");
    console.log(prefLang);
    
    translate.setDefaultLang(prefLang);
    translate.use(prefLang);

    console.log(translate.getBrowserLang());
    
    this.cartList = this.cartService.CartList;

  }

  totalCount(): number {
    this.cartList = this.cartService.CartList;
    let x = 0;
    if (this.cartList == undefined) {
      return x;
    } else {
      this.cartList.forEach(function (item) {
        x += item.Count;
      })
      return x;
    }
  }

  logout() {
    this.cartService.CartList.splice(0, this.cartService.CartList.length);
    this.authenticationService.logout();
    this.router.navigate(['/']);
    this.translate.get('LOG.OUT').subscribe((res: string) => {
      this.alertService.success(res, false);
    });
  }

  updatedUserName(): string {
    return localStorage.getItem("User");
  }

  setPrefLang(lang: string) {
    localStorage.setItem("PrefLang", lang);
    this.translate.use(localStorage.getItem("PrefLang"));
  }

}
