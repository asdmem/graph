import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Command } from '../../models/command';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {

  command: Command;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.command = () => this.dataService.getTemperature();
  }
}
