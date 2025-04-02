import { TestBed } from '@angular/core/testing';

import { AnilistApiService } from './anilist-api.service';

describe('AnilistApiService', () => {
  let service: AnilistApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnilistApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
