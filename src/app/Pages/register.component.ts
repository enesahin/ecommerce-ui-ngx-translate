import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../Services/user.service';
import { AlertService } from '../Services/alert.service';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent /* implements OnInit */ {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private translate: TranslateService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required],
            name: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        setTimeout(() => {
            this.userService.register(this.registerForm.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate(['/login']);
                        this.translate.get('REG.SUCC').subscribe((res: string) => {
                            this.alertService.success(res, false);
                        });
                        this.loading = false;
                    },
                    error => {
                        this.translate.get('REG.FAIL').subscribe((res: string) => {
                            this.alertService.error(res, false);
                        });
                        this.loading = false;
                    });
        }, 2000);

    }
}