import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Ship } from '../../../interfaces';
import { StarshipsService } from '../../separated-logic.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'star-ships1',
  template: `
  <div *ngIf="starships">
    <div *ngIf="starships.length===0">
      <h1>no related starships</h1>
    </div>
    <div *ngIf="starships.length!==0 ">  
      <h1>Related starships</h1>  
      <article *ngFor="let ship$ of starShipObservables">
          {{(ship$|async).name}}
      </article>
    </div>
  </div>
  `,
  styles: [
    `
    article {
      margin: 3px;
      background-color: rgba(151, 240, 193, 0.60);
      border-radius: 5px;
      padding: 3px;
      min-height: 1rem;
    }
    `
  ]
})
export class StarShip1Component implements OnChanges {
  @Input() starships: string[];
  starShipObservables: Observable<Ship>[];
  constructor(private sss: StarshipsService) {}

  ngOnChanges(changes: SimpleChanges) {
    // use the starships service to get an array of observables that
    // will containt the starship's details
    if (changes.starships.currentValue) {
      this.starShipObservables = this.starships.map(this.sss.load);
    }
  }
}
