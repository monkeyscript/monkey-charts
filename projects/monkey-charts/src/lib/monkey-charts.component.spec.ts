import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyChartsComponent } from './monkey-charts.component';

describe('MonkeyChartsComponent', () => {
  let component: MonkeyChartsComponent;
  let fixture: ComponentFixture<MonkeyChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonkeyChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonkeyChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
