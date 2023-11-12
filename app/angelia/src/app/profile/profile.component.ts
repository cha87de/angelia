import { Component } from '@angular/core';
import { StateService } from '../api/state.service';
import { HandlersStateResponse } from '../model/handlersStateResponse';
import { HandlersLogoutRequestBody } from '../model/handlersLogoutRequestBody';
import { AuthenticationService } from '../api/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  name: string | undefined = ""

  constructor(
    private stateService: StateService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
      this.stateService.apiStateGet().subscribe((data: HandlersStateResponse) => {
        console.info("state", data.data);
        this.name = data.data?.username;
      });
  }

  public logout() {
    let request: HandlersLogoutRequestBody = {
      targetURL: ""
    }
    this.authenticationService.apiLogoutPost(request).subscribe((data) => {
      console.info("logout", data);
      this.router.navigate(['/']);
    });
  }

}
