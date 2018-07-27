import { Component, OnInit, Input } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { MapData } from '../../models/mapped';
import { Command } from '../../models/command';

@Component({
  selector: 'app-graph-box',
  templateUrl: './graph-box.component.html',
  styleUrls: ['./graph-box.component.scss']
})
export class GraphBoxComponent implements OnInit {
  @Input() command: Command;
  @Input() domain = [-50, 50];

  isDataLoaded = false;
  data: MapData[];
  slicedData: MapData[];
  from = 1881;
  to = 2006;

  constructor() {}

  ngOnInit() {
    this.command().subscribe(data => {
      this.isDataLoaded = true;
      this.data = data;
      this.slicedData = data;
    });
  }
  dateChange(fromTo: number[]) {
    [this.from, this.to] = fromTo;
    this.slicedData = this.data.slice(this.from - 1881, this.to - 1881);
  }
}
