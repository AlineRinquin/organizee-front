import { TestBed } from '@angular/core/testing';

import { OrganizeeService } from './organizee.service';

describe('OrganizeeService', () => {
  let service: OrganizeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
