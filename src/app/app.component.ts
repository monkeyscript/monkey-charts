import { Component, OnInit } from '@angular/core';
import { BarChartData } from './data/bar-chart';
import { PieChartData } from './data/pie-chart';
import { ColorSchemes } from './utils/color-schemes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'monkey-charts-ws';

  chartType     : string;   
  colorScheme   : {
    name      : string,
    domain    : string[]
  }
  heightInput   : number;
  datum         : any;          

  colorSchemes  : {
    name      : string,
    domain    : string[]
  }[]

  ngOnInit() {

    // Initialize params 
    this.chartType = 'PIE';
    this.colorScheme = {
      name : 'Yasha',
      domain : []
    };
    this.heightInput = 300;
    this.colorSchemes = ColorSchemes;

    this.onChartTypeChange();
    this.onColorSchemeChange();

  }

  // 
  // On changing a chart type
  //
  onChartTypeChange(){
    switch (this.chartType) {

      // Line chart
      // case 'LINE':
      //   this.datum = VerticalBarData;
      //   break;
        
      // Vertical bar chart
      case 'VERTICAL_BAR':
        this.datum = BarChartData;
        break;
      
      // Horizontal bar chart
      case 'HORIZONTAL_BAR':
        this.datum = BarChartData;
        break;
      
      // Pie chart
      case 'PIE':
        this.datum = PieChartData;
        break;

      // Linear gauge
      // case 'LINEAR_GAUGE':
      //   this.datum = VerticalBarData;
      //   break;

      default:
        this.datum = [];
        break;

    }
  }

  //
  // On changing color scheme
  //
  onColorSchemeChange(){
    this.colorScheme.domain = this.colorSchemes.find(
      s => s.name === this.colorScheme.name
    ).domain;
  }

}
