import { Injectable, inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { StateService } from './api/state.service';
import { Observable, map, take } from "rxjs";
import { HandlersStateResponse } from './model/handlersStateResponse';

export @Injectable()
class PermissionsService {

  constructor(
    private stateService: StateService,
    private router: Router
  ) {

  }

  canActivate(): Observable<boolean> {
    return this.stateService.apiStateGet().pipe(
      take(1),
      map((response: HandlersStateResponse) => {
        if (response.data && response.data.authentication_level && response.data.authentication_level > 0){
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}


export const autheliaGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
