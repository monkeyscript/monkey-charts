import { NgModule } from '@angular/core';
import { MonkeyChartsComponent } from './monkey-charts.component';
import { PieComponent } from './components/pie/pie.component';

@NgModule({
  declarations: [
    MonkeyChartsComponent, 
    PieComponent, 
  ],
  imports: [
  ],
  exports: [
    MonkeyChartsComponent,
    PieComponent
  ]
})
export class MonkeyChartsModule { }
