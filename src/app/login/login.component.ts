import { Component, OnInit } from '@angular/core';
import { NgModule, ModuleWithProviders } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerCredentials = {user: 'admin', pass: 'admin'};

  constructor() { }

  ngOnInit() {
  }
  entrar () {
    if(this.registerCredentials.user === 'admin' && this.registerCredentials.user === 'admin')
    {
      alert('entrar');
    }
  }
}
