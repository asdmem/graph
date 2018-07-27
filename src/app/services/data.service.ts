import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/data';
import { Observable } from '../../../node_modules/rxjs';
import { mergeMap } from '../../../node_modules/rxjs/operators';
import { MapData } from '../models/mapped';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private calcFinished = new EventEmitter<MapData[]>();
  private worker: Worker;

  constructor(private httpClient: HttpClient) {
    this.worker = new Worker('worker.js');

  }

  getTemperature(): Observable<MapData[]> {
    return this.httpClient.get<Data[]>('assets/data/temperature.json').pipe(
      mergeMap((data) => {
        this.CalcAndMap(data);
        return this.calcFinished.asObservable();
      })
    );
  }

  getPreciptiation(): Observable<MapData[]> {
    return this.httpClient.get<Data[]>('assets/data/precipitation.json').pipe(
      mergeMap((data) => {
        this.CalcAndMap(data);
        return this.calcFinished.asObservable();
      })
    );
  }



  CalcAndMap(data: Data[]) {
    this.worker.postMessage(data);
    this.worker.onmessage = (event) => {
      this.calcFinished.emit(event.data);
    };
  }
}
