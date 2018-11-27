import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { DaoService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginGroup: FormGroup;

  constructor(private dao: DaoService, private router: Router) {
    this.loginGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  public onSubmit(formValues) {
    this.dao
      .login(
        this.loginGroup.get('email').value,
        this.loginGroup.get('password').value
      )
      .subscribe(response => {
        if (response) {
          this.router.navigate(['/main']);
        }
      });
  }
}
