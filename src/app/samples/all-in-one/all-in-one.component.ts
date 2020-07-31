import {merge, mergeMap, map, scan} from 'rxjs/operators';
import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RootObject, Person, Ship, Movie} from '../../interfaces';

import {of, Observable} from 'rxjs';

@Component({
  selector: 'all-in-one',
  templateUrl: './all-in-one.component.html',
  styleUrls: ['./all-in-one.component.css'],
})
export class AllInOneComponent {
  constructor(private http: HttpClient) {}

  starships: Observable<Ship>[] = [];
  movies: Observable<Movie>[] = [];

  selectedPerson: Person = {
    name: 'none selected',
    starships: [],
  } as Person;

  private _load = (url) =>
    this.http
      .get<RootObject<Person>>(url)
      .pipe(mergeMap((root) => (root.next ? of(root).pipe(merge(this._load(root.next.replace('http', 'https')))) : of(root))));

  private load = (url): Person[] =>
    this._load(url).pipe(
      map((r: RootObject<Person>) => r.results),
      scan((combinedList:Person[], latestAdditions) => combinedList.concat(latestAdditions)),
      map((set:Person[]) => set.sort((x, y) => (x.name < y.name ? -1 : 1)))
    );

  persons$ = this.load('https://swapi.dev/api/people/');

  select(person: Person) {
    this.selectedPerson = person;
    // replace the ships array
    this.starships = person.starships.map((url) => this.http.get<Ship>(url));
    // replace the movies array
    this.movies = person.films.map((url) => this.http.get<Movie>(url));
  }
}
