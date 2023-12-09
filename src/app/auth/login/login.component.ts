import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private srv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.srv.restore();
  }

  logme(form: NgForm) {
    try {
      this.srv.login(form.value).subscribe();
    } catch (error) {
      alert('errore nel login');
      this.router.navigate(['/login']);
    }
  }
}
