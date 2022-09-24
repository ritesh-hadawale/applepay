import { TestBed } from '@angular/core/testing';

import { ApplepayService } from './applepay.service';

describe('ApplepayService', () => {
  let service: ApplepayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplepayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
