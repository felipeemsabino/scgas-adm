import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AlertModule } from 'ng2-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { PostosComponent } from './components/postos/postos.component';
import { PostoFormComponent } from './components/postos/posto-form/posto-form.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaFormComponent } from './components/noticias/noticia-form/noticia-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { ParametrosGeraisComponent } from './components/parametros-gerais/parametros-gerais.component';

const appRoutes: Routes = [{
      path: 'home',
      children: [
        { path: 'postos', component: PostosComponent },
        { path: 'noticias', component: NoticiasComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'parametros-gerais', component: ParametrosGeraisComponent },
        /*{ path: 'temp2', component: TempComponent2 },*/
      ],
      component: HomeComponent
    },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PostosComponent,
    PostoFormComponent,
    NoticiasComponent,
    NoticiaFormComponent,
    UsuariosComponent,
    UsuarioFormComponent,
    ParametrosGeraisComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
