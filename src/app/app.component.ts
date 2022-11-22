import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { User } from './_models';
import './_content/app.less';
import { first } from 'rxjs/operators';
import { LoginComponent } from './login';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  shutdown() {
    console.log('Shutdown clicked');

    this.authenticationService
      .shutdown()
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('test');
        }
      );
  }
}
