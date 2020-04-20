import { NgModule } from '@angular/core';
import { MonkeyChartsComponent } from './monkey-charts.component';
import { VerticalBarComponent } from './components/vertical-bar/vertical-bar.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { PieComponent } from './components/pie/pie.component';
import { LineComponent } from './components/line/line.component';

@NgModule({
  declarations: [
    MonkeyChartsComponent,
    VerticalBarComponent,
    HorizontalBarComponent,
    PieComponent,
    LineComponent, 
  ],
  imports: [
  ],
  exports: [
    MonkeyChartsComponent,
    VerticalBarComponent,
    HorizontalBarComponent,
    PieComponent ,
    LineComponent, 
  ]
})
export class MonkeyChartsModule { }
