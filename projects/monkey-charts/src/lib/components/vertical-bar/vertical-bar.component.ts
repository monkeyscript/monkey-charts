import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'mc-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalBarComponent implements AfterViewInit {

  @ViewChild('mcVerticalBar', {static:false}) private chartContainer: ElementRef;

  @Input('height') height             : number;
  @Input('colorScheme') colorScheme   : string[];
  @Input('datum') datum               : {
    name    : string,
    value   : number,
    tooltip ?: string
  }[]

  constructor() { }

  ngAfterViewInit(){
    this.draw();
  }

  ngOnChanges(){
    // Check if view init 
    if(this.chartContainer){
      this.draw();
    }
  }

  //
  // Render chart
  //
  private draw(){

    // Remove existing svg
    d3.select('svg').remove();

    // Get element reference, height and width
    const element = this.chartContainer.nativeElement;
    const width = element.offsetWidth;
    const height = this.height;

    // Add svg
    const svg = d3.select(element)
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);
    
    // const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    // const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    // Define x axis 
    const xAxis = d3.scaleBand()
                    .rangeRound([0, width])
                    .padding(0.1)
                    .domain(this.datum.map(d => d.name));

    // Define y axis 
    const yAxis = d3.scaleLinear()
                    .rangeRound([height, 0])
                    .domain([0, d3.max(this.datum, d => d.value)]);

    const g = svg.append('g');
                // .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    // Append bars
    g.selectAll('.bar')
      .data(this.datum)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xAxis(d.name))
      .attr('y', d => yAxis(d.value))
      .attr('width', xAxis.bandwidth())
      .attr('height', d => height - yAxis(d.value));

  }

  //
  // On window resizing, redraw chart
  onResize() {
    this.draw();
  }

}
