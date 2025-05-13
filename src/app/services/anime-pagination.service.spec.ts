import { TestBed } from '@angular/core/testing';

import { AnimePaginationService } from './anime-pagination.service';

describe('AnimePaginationService', () => {
  let service: AnimePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
