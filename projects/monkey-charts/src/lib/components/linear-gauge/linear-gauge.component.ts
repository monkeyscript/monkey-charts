import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'mc-linear-gauge',
  templateUrl: './linear-gauge.component.html',
  styleUrls: ['./linear-gauge.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LinearGaugeComponent implements AfterViewInit {

  @ViewChild('mcLinearGauge', {static:false}) private chartContainer: ElementRef;

  @Input('id') id                     : string;
  @Input('height') height             : number;
  @Input('colorScheme') colorScheme   : string[];
  @Input('datum') datum               : {
    value   : string,
    maxima  : number,
    tooltip   ?: string
  }

  constructor() { }

  ngAfterViewInit(){

    // Validate inputs
    this.height = this.height ? this.height : 300;
    this.height = this.height<0 ? 300 : this.height;
    this.colorScheme = this.colorScheme ? this.colorScheme : ['#78d0d3'];
    this.datum = this.datum ? this.datum : {
      value : '0',
      maxima : 100
    };
    
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
    d3.select('#mcLinearGauge_'+this.id).select('svg').remove();
    d3.select('#mcLinearGauge_'+this.id).select('.linear-gauge-tooltip').remove();

    // Get element reference, height and width
    const element = this.chartContainer.nativeElement;
    const width = element.offsetWidth;
    const height = this.height;

    d3.select(element).style('position', 'relative');

    // Add svg
    const svg = d3.select(element)
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);

    // Add tooltip
    var tooltip = d3.select(element)
                    .append("div")
                    .attr("class", "linear-gauge-tooltip");

    // Define band 
    const band = d3 .scaleLinear()
                    .rangeRound([0, width])
                    .domain([0, this.datum.maxima]);

    // Append group 
    const g = svg.append('g');
    
    // Append background rect
    g.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', () => {
        return this.colorScheme[0];
      })
      .attr('fill-opacity', 0.2);

    // Append primary rect 
    g.append('rect')
      .attr('class', 'gauge')
      .attr('x', 0)
      .attr('y', 0)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', band(+this.datum.value))
      .attr('height', height)
      .attr('fill', () => {
        return this.colorScheme[0];
      })
      .on("mousemove", () => {
        // Check for custom tooltip 
        const tooltipText = this.datum.tooltip ? this.datum.tooltip : this.datum.value;
        tooltip
          .style("left", `${d3.event.layerX}px`)
          .style("top", `${d3.event.layerY - 35}px`)
          .style("display", "inline-block")
          .html(tooltipText);
      })
      .on("mouseout", () => { 
        tooltip
          .style("display", "none");
      });

  }

  //
  // On window resizing, redraw chart
  onResize(event:any) {
    this.draw();
  }

}
