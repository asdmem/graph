import { Component, OnInit } from '@angular/core';
import { Command } from '../../models/command';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrls: ['./precipitation.component.scss']
})
export class PrecipitationComponent implements OnInit {

  command: Command;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.command = () => this.dataService.getPreciptiation();
  }

}
