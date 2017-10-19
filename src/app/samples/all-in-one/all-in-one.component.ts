import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootObject, Person, ship } from '../../interfaces';

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
  selector: 'all-in-one',
  templateUrl: './all-in-one.component.html',
  styleUrls: ['./all-in-one.component.css']
})
export class AllInOneComponent implements OnInit {
  starships: Observable<ship>[] = [];
  selectedPerson: Person;
  private _load = <T>(url) =>
    this.http
      .get<RootObject<T>>(url)
      .mergeMap(
        root => (root.next ? of(root).merge(this._load(root.next)) : of(root))
      );

  private load = <T>(url): T[] =>
    this._load(url)
      .map((r: RootObject<T>) => r.results)
      .scan((combinedList, latestAdditions) =>
        combinedList.concat(latestAdditions)
      )
      .map(set => set.sort((x, y) => (x.name < y.name ? -1 : 1)));

  persons$ = this.load<Person>('https://swapi.co/api/people/');
  constructor(private http: HttpClient) {}

  select(person: Person) {
    console.log('assigning', person.name);
    this.selectedPerson = person;
    // clean out the ships array
    this.starships = person.starships.map(url =>
      this.http.get<Ships.ship>(url)
    );
  }

  ngOnInit() {}
}
