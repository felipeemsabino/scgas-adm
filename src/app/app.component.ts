import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private userIsLogged: boolean;

  constructor(private router: Router) {
    this.userIsLogged = false;
  }

  ngOnInit() {
    console.log('this.userIsLogged -> ' + this.userIsLogged);
    if(!this.userIsLogged) {
      // redirect to login page
      this.router.navigate(['/login']);
    } else {
      // redirect to first page
    }
  }
}
