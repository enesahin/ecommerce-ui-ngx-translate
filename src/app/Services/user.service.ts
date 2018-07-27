import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from '../../../node_modules/rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    /*  getAll() {
         return this.http.get<User[]>(`${environment.apiUrl}/users`);
     }
 
     getById(id: number) {
         return this.http.get(`${environment.apiUrl}/users/` + id);
     }
  */
    register(user: User): Observable<boolean> {
        let url = "http://localhost:62525/api/user";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, user, options)
            .pipe(map((response: Response) => {
                return true;
            }));
    }

    /*  update(user: User) {
         return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
     }
 
     delete(id: number) {
         return this.http.delete(`${environment.apiUrl}/users/` + id);
     } */
}