import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-movies',
  template: `
  <article *ngFor="let movie$ of movies">
    <ng-container *ngIf='movie$ | async; let movie'>
      {{movie.title}}
    </ng-container>
  </article>
  `,
  styles: [
    `
  article {
    margin: 3px;
    background-color: rgba(101, 26, 83, 0.60);
    border-radius: 5px;
    padding: 3px;
    min-height: 1rem;
  }
  `
  ]
})
export class MoviesComponent implements OnInit {
  @Input() movies: Observable<Movie>[];

  constructor() {}

  ngOnInit() {}
}
