import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { MainPageComponent } from './slides/main-page/main-page.component';
import { LoginComponent } from './slides/login/login.component';


const routes: Routes = [
  { path: '', component: MainComponentComponent },
  { path: 'home', component: MainComponentComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
