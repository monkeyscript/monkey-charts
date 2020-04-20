import { Component, OnInit } from '@angular/core';
import { BarChartData } from './data/bar-chart';
import { PieChartData } from './data/pie-chart';
import { LineChartData } from './data/line-chart';
import { LinearGaugeData } from './data/linear-gauge';
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

  // Utils 
  colorSchemes  : {
    name      : string,
    domain    : string[]
  }[]

  ngOnInit() {

    // Initialize params 
    this.chartType = 'LINEAR_GAUGE';
    this.colorScheme = {
      name : 'Yasha',
      domain : []
    };
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
      case 'LINE':
        this.datum = LineChartData;
        this.heightInput = 300;
        break;
        
      // Vertical bar chart
      case 'VERTICAL_BAR':
        this.datum = BarChartData;
        this.heightInput = 300;
        break;
      
      // Horizontal bar chart
      case 'HORIZONTAL_BAR':
        this.datum = BarChartData;
        this.heightInput = 300;
        break;
      
      // Pie chart
      case 'PIE':
        this.datum = PieChartData;
        this.heightInput = 300;
        break;

      // Linear gauge
      case 'LINEAR_GAUGE':
        this.datum = LinearGaugeData;
        this.heightInput = 60;
        break;

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
