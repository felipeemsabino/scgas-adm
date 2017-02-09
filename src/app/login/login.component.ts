import { Component, OnInit } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerCredentials = {user: 'admin', pass: 'admin'};

  constructor(private router: Router) { }

  ngOnInit() {
  }
  entrar () {
    if(this.registerCredentials.user === 'admin' && this.registerCredentials.user === 'admin')
    {
      this.router.navigate(['/home']);
    }
  }
}
