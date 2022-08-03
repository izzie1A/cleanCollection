import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../services/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthGuard) { }

  ngOnInit(): void {
  }

}
