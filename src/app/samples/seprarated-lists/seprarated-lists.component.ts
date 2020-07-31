import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, merge, mergeMap, scan } from 'rxjs/operators';
import { Movie, Person, RootObject, Ship } from '../../interfaces';


@Component({
  selector: 'seprarated-lists',
  templateUrl: './separated-list.component.html',
  styleUrls: ['./separated-list.component.css'],
})
export class SepraratedListsComponent {
  constructor(private http: HttpClient) {}

  starships: Observable<Ship>[] = [];
  movies: Observable<Movie>[] = [];

  selectedPerson: Person = {
    name: 'none selected', 
    starships: [],
  } as Person;

  private _load = (url) =>
    this.http
      .get<RootObject<Person>>(url.replace('http:', 'https:'))
      .pipe(mergeMap((root) => (root.next ? of(root).pipe(merge(this._load(root.next))) : of(root))));

  private load = (url): Person[] =>
    this._load(url.replace('http:','https:')).pipe(
      map((r: RootObject<Person>) => r.results),
      scan((combinedList:Person[], latestAdditions:Person[]) => combinedList.concat(latestAdditions)),
      map((set:any[]) => set.sort((x, y) => (x.name < y.name ? -1 : 1)))
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
