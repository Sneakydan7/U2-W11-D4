import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registra(form: NgForm) {
    try {
      this.authSrv.register(form.value).subscribe();
    } catch (error: any) {
      alert(error);
      this.router.navigate(['/signin']);
    }
  }
}
