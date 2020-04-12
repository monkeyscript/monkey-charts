import { NgModule } from '@angular/core';
import { MonkeyChartsComponent } from './monkey-charts.component';
import { VerticalBarComponent } from './components/vertical-bar/vertical-bar.component';

@NgModule({
  declarations: [
    MonkeyChartsComponent,
    VerticalBarComponent, 
  ],
  imports: [
  ],
  exports: [
    MonkeyChartsComponent,
    VerticalBarComponent
  ]
})
export class MonkeyChartsModule { }
