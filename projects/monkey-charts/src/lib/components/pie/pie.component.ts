import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'mc-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PieComponent implements AfterViewInit {

  @ViewChild('mcPie', {static:false}) private chartContainer: ElementRef;

  @Input('id') id                     : string;
  @Input('height') height             : number;
  @Input('colorScheme') colorScheme   : string[];
  @Input('datum') datum               : {
    name    : string,
    value   : number,
    tooltip ?: string
  }[]
  @Input('strokeColor') strokeColor   : string;
  @Input('strokeWidth') strokeWidth   : number;

  constructor() { }

  ngAfterViewInit(){

    // Validate inputs
    this.height = this.height ? this.height : 300;
    this.height = this.height<0 ? 300 : this.height;
    this.colorScheme = this.colorScheme ? this.colorScheme : ['#78d0d3'];
    this.datum = this.datum ? this.datum : [];
    this.strokeColor = this.strokeColor ? this.strokeColor : 'white';
    this.strokeWidth = this.strokeWidth ? this.strokeWidth : 2;
    
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
    d3.select('#mcPie_'+this.id).select('svg').remove();
    d3.select('#mcPie_'+this.id).select('.pie-chart-tooltip').remove();

    // Get element reference, height and width
    const element = this.chartContainer.nativeElement;
    const width = element.offsetWidth;
    const height = this.height;

    // Sort data 
    let datum = this.datum.sort(
      (a,b) => {
        return a.value - b.value;
      }
    );

    // Find radius : minima of height and width / 2
    const radius = Math.min(width, height) / 2;

    // Add svg
    const svg = d3.select(element)
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height);

    // Add tooltip
    var tooltip = d3.select(element)
                    .append("div")
                    .attr("class", "pie-chart-tooltip");

    // Append group 
    const g = svg .append('g')
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    
    // Compute the position of each group on the pie:
    var pie = d3.pie<any>()
                .value((d) => d.value);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    g .selectAll('arc')
      .data(pie(datum))
      .enter()
      .append('path')
      .attr('class', 'arc')
      .attr('d',  d3.arc<any>()
                    .innerRadius(0)
                    .outerRadius(radius)
      )
      .attr('fill', (d, i )=> {
        return this.colorScheme[i % this.colorScheme.length];
      })
      .attr("stroke", this.strokeColor)
      .style("stroke-width", this.strokeWidth + "px")
      .on("mousemove", (d) => {
        // Check for custom tooltip 
        let tooltipText = d.data.tooltip ? d.data.tooltip : `${d.data.name}: ${d.data.value}`;
        tooltip
          .style("left", `${d3.event.offsetX}px`)
          .style("top", `${d3.event.offsetY}px`)
          .style("display", "inline-block")
          .html(tooltipText);
      })
      .on("mouseout", () => { 
        tooltip
          .style("display", "none");
      });

  }

  // On window resizing, redraw chart
  onResize(event:any) {
    this.draw();
  }

}
