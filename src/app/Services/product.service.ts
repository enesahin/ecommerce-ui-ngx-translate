import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from "rxjs/operators";
import { Observable } from '../../../node_modules/rxjs';
import { Product } from '../Models/Product';

@Injectable()
export class ProductService {


    constructor(private _http: Http) { }

    getProducts() {

        return this._http.get('http://localhost:62525/api/product')
            .pipe(map((response: Response) => response.json()));

    }

    getProductById(prodId: string) {
        return this._http.get("http://localhost:62525/api/product/" + prodId)
            .pipe(map((response: Response) => response.json()));
    }
}
