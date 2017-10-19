import { Component, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../../../interfaces';
import { MovieService } from '../../separated-logic.service';

@Component({
  selector: 'app-movies1',
  template: `
  <article *ngFor="let movie$ of movieObservables">
      {{(movie$|async).title}}
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
export class Movies1Component {
  @Input() movies: string[];
  movieObservables: Observable<Movie>[];

  constructor(private ms: MovieService) {}
  ngOnChanges(changes: SimpleChanges) {
    // use the starships service to get an array of observables that
    // will containt the starship's details
    if (changes.movies.currentValue) {
      this.movieObservables = this.movies.map(this.ms.load);
    }
  }
}
