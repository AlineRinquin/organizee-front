import { TestBed } from '@angular/core/testing';

import { RepertoireService } from './repertoire.service';

describe('RepertoireService', () => {
  let service: RepertoireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepertoireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
