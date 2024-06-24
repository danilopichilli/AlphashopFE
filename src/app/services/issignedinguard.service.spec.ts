import { TestBed } from '@angular/core/testing';

import { IssignedinguardService } from './issignedinguard.service';

describe('IssignedinguardService', () => {
  let service: IssignedinguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssignedinguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
