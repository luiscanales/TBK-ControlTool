import { TestBed } from '@angular/core/testing';

import { UserslistService } from './userslist.service';

describe('UserslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserslistService = TestBed.get(UserslistService);
    expect(service).toBeTruthy();
  });
});
