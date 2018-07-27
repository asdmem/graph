import { MapData } from './mapped';
import { Observable } from '../../../node_modules/rxjs';

export type Command = () => Observable<MapData[]>;
