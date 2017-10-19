import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootObject, Person, Ship, Movie } from '../../interfaces';

import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'seprarated-lists',
  templateUrl: './separated-list.component.html',
  styleUrls: ['./separated-list.component.css']
})
export class SepraratedListsComponent {
  constructor(private http: HttpClient) {}

  starships: Observable<Ship>[] = [];
  movies: Observable<Movie>[] = [];

  selectedPerson: Person = {
    name: 'none selected',
    starships: []
  } as Person;

  private _load = url =>
    this.http
      .get<RootObject<Person>>(url)
      .mergeMap(
        root => (root.next ? of(root).merge(this._load(root.next)) : of(root))
      );

  private load = (url): Person[] =>
    this._load(url)
      .map((r: RootObject<Person>) => r.results)
      .scan((combinedList, latestAdditions) =>
        combinedList.concat(latestAdditions)
      )
      .map(set => set.sort((x, y) => (x.name < y.name ? -1 : 1)));

  persons$ = this.load('https://swapi.co/api/people/');

  select(person: Person) {
    this.selectedPerson = person;
    // replace the ships array
    this.starships = person.starships.map(url => this.http.get<Ship>(url));
    // replace the movies array
    this.movies = person.films.map(url => this.http.get<Movie>(url));
  }
}
