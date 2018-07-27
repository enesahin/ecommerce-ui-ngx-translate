import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(email: string, password: string): Observable<boolean> {

        let url = "http://localhost:62525/token";
        let body = "username=" + email + "&password=" + password + "&grant_type=password";
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .pipe(map((response: Response) => {
                let result: any = response.json();
                localStorage.setItem("User", email);
                localStorage.setItem("Token", "Bearer " + result.access_token);
                return true;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("User");
        localStorage.removeItem("Token");
    }

    loginCheck(): boolean {
        if (localStorage.getItem("User") == null && localStorage.getItem("Token") == null) {
            return false;
        } else {
            return true;
        }
    }
}