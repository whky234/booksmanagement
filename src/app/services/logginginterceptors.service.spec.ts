import { TestBed } from '@angular/core/testing';

import { LogginginterceptorsService } from './logginginterceptors.service';

describe('LogginginterceptorsService', () => {
  let service: LogginginterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogginginterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
