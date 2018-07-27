import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  @Output() changeDate = new EventEmitter<number[]>();

  from = 1881;
  to = 2006;
  years: number[];

  constructor() { }

  ngOnInit() {
    this.years = new Array(126).fill(0).map((v, i) => i + 1881);

  }

  checkFromTo(source: string) {
    const isGreater = this.from > this.to;
    if (!isGreater) {
      this.changeDate.emit([this.from, this.to]);
      return;
    }

    // next tick
    window.setTimeout(() => {
      if (source === 'from' ) {
        this.from = this.to;
      } else {
        this.to = this.from;
      }
      this.changeDate.emit([this.from, this.to]);
    });
  }

}
