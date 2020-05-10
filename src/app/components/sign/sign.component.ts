import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
})
export class SignComponent implements OnInit {
  signInForm: FormGroup;
  signUpForm: FormGroup;
  loading = false;

  constructor(
    private authenticateService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get formSignIn() { return this.signInForm.controls; }
  get formSignUp() { return this.signUpForm.controls; }

  

  signUp(data: Object) {
    this.authenticateService.signUp(data).then((data) => {
      this.loading = false;
      this.router.navigate(['/']);
    }).catch(err => {
      this.loading = false;
    });
  }

  onSignIn() {
    this.loading = true;
    if (this.signInForm.invalid) { 
      this.loading = false;
      return 
    }

    this.authenticateService.signIn(this.signInForm.value).then((data) => {
      this.signUp({ email: this.signInForm.value.email, password: this.signInForm.value.password });
    }).catch(err => {
      this.loading = false;
      this.signInForm.controls['email'].setErrors({ 'exist': true });
    });
  }

  onSignUp() {
    this.loading = true;
    if (this.signUpForm.invalid) { 
      this.loading = false
      return 
    }

    this.signUp(this.signUpForm.value);
  }
}
