import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../../../interfaces';

@Component({
  selector: 'star-ships',
  template: `
  <div *ngIf="starships.length===0">
    <h1>no related starships</h1>
  </div>
  <div *ngIf="starships.length!==0">  
    <h1>Related starships</h1>  
    <article *ngFor="let ship$ of starships">
      <ng-container *ngIf='ship$ | async; let ship'>
        {{ship.name}}
      </ng-container>
    </article>
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
export class StarshipsComponent {
  @Input() starships: Ship[];

  constructor() {}
}
