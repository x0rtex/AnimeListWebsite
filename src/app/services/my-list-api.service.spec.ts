import { TestBed } from '@angular/core/testing';

import { MyListApiService } from './my-list-api.service';

describe('MyListApiService', () => {
  let service: MyListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
