import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  Input,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../../services/data.service';
import { Data } from '../../models/data';
import { MapData } from '../../models/mapped';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit, OnChanges {
  @Input() data: MapData[];
  @Input() startDate: number;
  @Input() endDate: number;
  @Input() domain: number[];

  @ViewChild('svgEl') svgEl: ElementRef<SVGElement>;
  svg: SVGElement;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.svg = this.svgEl.nativeElement;
    this.drawSVG();
  }

  ngOnChanges() {
    this.drawSVG();
  }

  drawSVG() {
    const svg = d3.select(this.svg);
    svg.selectAll('*').remove();
    const scaleY = d3
      .scaleLinear()
      .domain(this.domain)
      .range([390, 10]);
    const scaleX = d3
      .scaleLinear()
      .domain([this.startDate, this.endDate])
      .range([40, 390]);
    const yAxis = d3.axisLeft(scaleY);
    const line = d3
      .line<MapData>()
      .x(d => scaleX(d.year))
      .y(d => scaleY(d.averageTemperature));
    const lineMax = d3
      .line<MapData>()
      .x(d => scaleX(d.year))
      .y(d => scaleY(d.MaxTemperature));
    const lineMin = d3
      .line<MapData>()
      .x(d => scaleX(d.year))
      .y(d => scaleY(d.minTemperature));
    svg
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
    svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
    svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
    svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'lightgreen')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', lineMax);
    svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'yellow')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', lineMin);
    svg
      .append('g')
      .selectAll('text')
      .data<MapData>(this.data.filter((v, i) => i % 20 === 0 || i === 0))
      .enter()
      .append('text')
      .attr('x', d => scaleX(d.year))
      .attr('y', d => scaleY(d.MaxTemperature) - 10)
      .text(d => d.MaxTemperature);
    svg
      .append('g')
      .selectAll('text')
      .data<MapData>(this.data.filter((v, i) => i % 20 === 0 || i === 0))
      .enter()
      .append('text')
      .attr('x', d => scaleX(d.year))
      .attr('y', d => scaleY(d.averageTemperature) - 10)
      .text(d => d.averageTemperature.toFixed(1));
    svg
      .append('g')
      .selectAll('text')
      .data<MapData>(this.data.filter((v, i) => i % 20 === 0 || i === 0))
      .enter()
      .append('text')
      .attr('x', d => scaleX(d.year))
      .attr('y', d => scaleY(d.minTemperature) - 10)
      .text(d => d.minTemperature);
  }
}
