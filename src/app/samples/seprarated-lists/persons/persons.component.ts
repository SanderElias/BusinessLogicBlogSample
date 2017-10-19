import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../../../interfaces';

@Component({
  selector: 'app-persons',
  template: `
  <h1>people</h1>
  <article *ngFor='let person of persons' (click)="selectedNewPerson.emit(person)">
    {{person.name}}
  </article>
  `,
  styles: [
    `
  article {
    cursor: pointer;
    margin: 3px;
    background-color: rgba(222, 240, 151, 0.6);
    border-radius: 5px;
    padding: 3px;
    min-height: 1rem;
  }
  `
  ]
})
export class PersonsComponent implements OnInit {
  @Input() persons: Person[];
  @Output() selectedNewPerson: EventEmitter<Person> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
