import { TestBed } from '@angular/core/testing';

import { TranscriberService } from './transcriber.service';

describe('TranscriberService', () => {
  let service: TranscriberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscriberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
