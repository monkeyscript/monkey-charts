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
    d3.select('#mcVerticalBar_'+this.id).select('svg').remove();
    d3.select('#mcVerticalBar_'+this.id).select('.vertical-bar-chart-tooltip').remove();

    // Get element reference, height and width
    const element = this.chartContainer.nativeElement;
    const width = element.offsetWidth;
    const height = this.height;

    // Add relative position to chart container
    d3.select(element).style('position', 'relative');

    // Add svg
    const svg = d3.select(element)
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);

    // Add tooltip
    var tooltip = d3.select(element)
                    .append("div")
                    .attr("class", "vertical-bar-chart-tooltip");

    // Define x axis 
    const xAxis = d3.scaleBand()
                    .rangeRound([0, width])
                    .padding(0.1)
                    .domain(this.datum.map(d => d.name));

    // Define y axis 
    const yAxis = d3.scaleLinear()
                    .rangeRound([height, 0])
                    .domain([0, d3.max(this.datum, d => d.value)]);

    // Append group 
    const g = svg.append('g');
    
    // Append bars
    g.selectAll('.bar')
      .data(this.datum)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xAxis(d.name))
      .attr('y', d => yAxis(d.value))
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', xAxis.bandwidth())
      .attr('height', d => height - yAxis(d.value))
      .attr('fill', (d, i )=> {
        return this.colorScheme[i % this.colorScheme.length];
      })
      .on("mousemove", (d) => {
        // Check for custom tooltip 
        let tooltipText = d.tooltip ? d.tooltip : `${d.name}: ${d.value}`;
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
