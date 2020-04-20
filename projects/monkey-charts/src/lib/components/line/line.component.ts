import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'mc-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineComponent implements AfterViewInit {

  @ViewChild('mcLine', {static:false}) private chartContainer: ElementRef;

  @Input('id') id                     : string;
  @Input('height') height             : number;
  @Input('colorScheme') colorScheme   : string[];
  @Input('datum') datum               : {
    name    : string,
    value   : number,
    tooltip ?: string
  }[]

  constructor() { }

  ngAfterViewInit(){

    // Validate inputs
    this.height = this.height ? this.height : 300;
    this.height = this.height<0 ? 300 : this.height;
    this.colorScheme = this.colorScheme ? this.colorScheme : ['#78d0d3'];
    this.datum = this.datum ? this.datum : [];
    
    this.draw();
  }

  ngOnChanges(){
    // Check if view init 
    if(this.chartContainer){
      this.ngAfterViewInit();
    }
  }

  //
  // Render chart
  //
  private draw(){

    // Remove existing svg and tooltips
    d3.select('#mcLine_'+this.id).select('svg').remove();
    d3.select('#mcLine_'+this.id).select('.line-chart-tooltip').remove();

    // Get element reference, height and width
    const element = this.chartContainer.nativeElement;
    const width = element.offsetWidth;
    const height = this.height;

    // Add svg
    const svg = d3.select(element)
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);

    // Add tooltip
    var tooltip = d3.select(element)
                    .append("div")
                    .attr("class", "line-chart-tooltip");

    // Define x axis 
    const xAxis = d3.scalePoint()
                    .rangeRound([0, width])
                    .domain(this.datum.map(d => d.name));

    // Define y axis 
    const yAxis = d3.scaleLinear()
                    .rangeRound([height, 0])
                    .domain([0, d3.max(this.datum, d => d.value)]);

    // Append group 
    const g = svg.append('g');

    // Add the line
    g .append("path")
      .datum(this.datum)
      .attr("fill", "none")
      .attr("stroke", this.colorScheme[0])
      .attr("stroke-width", 1.5)
      .attr("d",  d3.line<any>()
                    .x(function(d) { return xAxis(d.name) })
                    .y(function(d) { return yAxis(d.value) })
      )

    // Add the area
    g .append("path")
      .datum(this.datum)
      .attr("fill", this.colorScheme[0])
      .attr("fill-opacity", .2)
      .attr("stroke", "none")
      .attr("d",  d3.area<any>()
                    .x(function(d) { return xAxis(d.name) })
                    .y0( height )
                    .y1(function(d) { return yAxis(d.value) })
      )
    
  }

  //
  // On window resizing, redraw chart
  onResize(event:any) {
    this.draw();
  }

}

