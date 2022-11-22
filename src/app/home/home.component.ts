import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  playForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,

    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.playForm = this.formBuilder.group({
      inputStr: ['', Validators.required],
    });

    //get return url from router
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.playForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submitted
    this.alertService.clear();

    //stop if form invalid
    if (this.playForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService
      .getPpMatch(this.f.inputStr.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
