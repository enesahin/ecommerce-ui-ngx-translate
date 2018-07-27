import { Component } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Cart } from '../Models/Cart';

@Component({
    selector: 'cart',
    templateUrl: 'cart.component.html'
})

export class CartComponent {

    cartList: Cart[];

    constructor(private cartService: CartService) {
        window.scrollTo(0, 0);
        this.cartList = this.cartService.CartList;
    }

    totalPrice(item: Cart): number {
        return item.Count * item.ProductPrice;
    }

    totalShopping(): number {
        let x = 0;
        if (this.cartList == undefined) {
            return x;
        } else {
            this.cartList.forEach(function (item) {
                x += item.Count * item.ProductPrice;
            });
            return x;
        }
    }

    deleteItem(productId: number) {
        let item = this.cartList.find(x => x.ProductId == productId);
        if (item.Count > 1) {
            item.Count--;
        } else {
            let index = this.cartList.indexOf(item);
            this.cartList.splice(index, 1);
        }
    }
}