import { Component } from '@angular/core';
import { AuthenticationService } from '../api/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HandlersBodyFirstFactorRequest } from '../model/handlersBodyFirstFactorRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  error: string | null = null;
  pending: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  submit() {
    if (this.form.valid) {
      this.error = null;
      this.pending = true;
      let creds: HandlersBodyFirstFactorRequest = {
        username: this.form.value.username,
        password: this.form.value.password
      }
      this.authenticationService.apiFirstfactorPost(creds).subscribe({
        next: (v) => this.handleSuccess(v),
        error: (e) => this.handleError(e),
        complete: () => { this.pending = false; }
      });
    }
  }

  private handleSuccess(v: any) {
    this.router.navigate(["/"]);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      this.error = "An error inside the application occurred.";
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      this.error = `The server reported an error: ${error.status}`;
    }
    this.pending = false;
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



}
