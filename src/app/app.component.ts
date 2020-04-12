import { Component, OnInit } from '@angular/core';
import { VerticalBarData } from './data/vertical-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'monkey-charts-ws';

  chartType     : string;
  colorScheme   : string;
  heightInput   : number;
  datum         : any;          

  ngOnInit() {

    // Initialize params 
    this.chartType = 'VERTICAL_BAR';
    this.colorScheme = '';
    this.heightInput = 300;

    this.onChartTypeChange();

  }

  // 
  // On changing a chart type
  onChartTypeChange(){
    switch (this.chartType) {

      // Line chart
      case 'LINE':
        this.datum = VerticalBarData;
        break;
        
      // Vertical bar chart
      case 'VERTICAL_BAR':
        this.datum = VerticalBarData;
        break;
      
      // Horizontal bar chart
      case 'HORIZONTAL_BAR':
        this.datum = VerticalBarData;
        break;
      
      // Pie chart
      case 'PIE':
        this.datum = VerticalBarData;
        break;

      // Linear gauge
      case 'LINEAR_GAUGE':
        this.datum = VerticalBarData;
        break;

      default:
        this.datum = [];
        break;

    }
  }

}
