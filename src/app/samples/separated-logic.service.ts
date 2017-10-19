import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RootObject, Person, Ship, Movie } from '../interfaces';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SwapiService {
  constructor(private http: HttpClient) {}

  private _load = <T>(url) =>
    this.http
      .get<RootObject<T>>(url)
      .mergeMap(
        root => (root.next ? of(root).merge(this._load(root.next)) : of(root))
      );

  public loadAll = <T>(url): Observable<T[]> =>
    this._load<T>(url)
      .map((r: RootObject<T>) => r.results)
      .scan((combinedList, latestAdditions) =>
        combinedList.concat(latestAdditions)
      )
      .map(set => set.sort((x, y) => (x.name < y.name ? -1 : 1)));
}

@Injectable()
export class PeopleService {
  constructor(private swapi: SwapiService) {}

  persons$ = this.swapi.loadAll<Person>('https://swapi.co/api/people/');
}

@Injectable()
export class StarshipsService {
  private starships$ = this.swapi
    .loadAll<Ship>('https://swapi.co/api/starships')
    .shareReplay(1);

  load(url) {
    // this version doesn't load the ships over and over again anymore
    return this.starships$.map(ships => ships.find(cur => cur.url === url));
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
  private movies$ = this.swapi
    .loadAll<Movie>('https://swapi.co/api/films')
    .shareReplay(1);

  load(url) {
    // this version doesn't load the ships over and over again anymore
    return this.movies$.map(ships => ships.find(cur => cur.url === url));
  }
  constructor(private swapi: SwapiService) {
    // trick to load the straships at init, and keep them in mmory
    // for the lifetime of the app. (shareReplay releases without subscriber!)
    this.movies$.subscribe();
    this.load = this.load.bind(this);
  }
}
