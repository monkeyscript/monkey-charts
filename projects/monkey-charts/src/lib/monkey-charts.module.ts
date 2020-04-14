import { NgModule } from '@angular/core';
import { MonkeyChartsComponent } from './monkey-charts.component';
import { VerticalBarComponent } from './components/vertical-bar/vertical-bar.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';

@NgModule({
  declarations: [
    MonkeyChartsComponent,
    VerticalBarComponent,
    HorizontalBarComponent, 
  ],
  imports: [
  ],
  exports: [
    MonkeyChartsComponent,
    VerticalBarComponent,
    HorizontalBarComponent, 
  ]
})
export class MonkeyChartsModule { }
