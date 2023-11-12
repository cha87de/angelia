import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autheliaGuard } from './authelia.guard';

describe('autheliaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autheliaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
