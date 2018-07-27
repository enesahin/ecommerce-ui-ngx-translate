import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../Models/Product';

@Component({
    selector: 'detail',
    templateUrl: 'detail.component.html'
})


export class DetailComponent {

    product = new Product;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService
    ) {
        const id = this.route.snapshot.paramMap.get('id');
        this.productService.getProductById(id).
            subscribe(data => this.product = data);
    }
}