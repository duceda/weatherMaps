import { TestBed } from '@angular/core/testing';

import { ForecastViewerService } from './forecast-viewer.service';

describe('ForecastViewerService', () => {
  let service: ForecastViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
