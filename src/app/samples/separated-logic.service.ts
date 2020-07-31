import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, merge, mergeMap, scan, shareReplay} from 'rxjs/operators';
import {urlify} from '../util/urlify';
import {Movie, Person, RootObject, Ship} from '../interfaces';

@Injectable()
export class SwapiService {
  constructor(private http: HttpClient) {}

  private _load = <T>(url) =>
    this.http
      .get<RootObject<T>>(urlify(url))
      .pipe(mergeMap((root) => (root.next ? of(root).pipe(merge(this._load(root.next))) : of(root))));

  public loadAll = <T>(url): Observable<T[]> =>
    this._load<T>(url).pipe(
      map((r: RootObject<T>) => r.results),
      scan((combinedList: T[], latestAdditions) => combinedList.concat(latestAdditions)),
      map((set: any[]) => set.sort((x, y) => (x.name < y.name ? -1 : 1)))
    );
}

@Injectable()
export class PeopleService {
  constructor(private swapi: SwapiService) {}

  persons$ = this.swapi.loadAll<Person>('https://swapi.dev/api/people/');
}

@Injectable()
export class StarshipsService {
  private starships$ = this.swapi.loadAll<Ship>('https://swapi.dev/api/starships').pipe(shareReplay(1));

  load(url) {
    // this version doesn't load the ships over and over again anymore
    return this.starships$.pipe(
      map((ships) => ships.find((cur) => cur.url === url))
    );
  }
  constructor(private swapi: SwapiService) {
    // trick to load the straships at init, and keep them in mmory
    // for the lifetime of the app. (shareReplay releases without subscriber!)
    this.starships$.subscribe();
    this.load = this.load.bind(this);
  }
}

@Injectable()
export class MovieService {
  private movies$ = this.swapi.loadAll<Movie>('https://swapi.dev/api/films').pipe(shareReplay(1));

  load(url) {
    // this version doesn't load the ships over and over again anymore
    return this.movies$.pipe(
      map((ships) => ships.find((cur) => cur.url === url))
    );
  }
  constructor(private swapi: SwapiService) {
    // trick to load the straships at init, and keep them in mmory
    // for the lifetime of the app. (shareReplay releases without subscriber!)
    this.movies$.subscribe();
    this.load = this.load.bind(this);
  }
}
