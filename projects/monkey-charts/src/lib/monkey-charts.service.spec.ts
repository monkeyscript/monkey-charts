import { TestBed } from '@angular/core/testing';

import { MonkeyChartsService } from './monkey-charts.service';

describe('MonkeyChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonkeyChartsService = TestBed.get(MonkeyChartsService);
    expect(service).toBeTruthy();
  });
});
