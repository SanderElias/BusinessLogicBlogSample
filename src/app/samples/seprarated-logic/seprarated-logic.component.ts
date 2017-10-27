import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../separated-logic.service';
import { Person } from '../../interfaces';

@Component({
    selector: 'seprarated-logic',
    templateUrl: './seprarated-logic.component.html',
    styleUrls: ['./seprarated-logic.component.css']
})
export class SepraratedLogicComponent {
    persons$ = this.logic.persons$;
    selectedPerson: Person;

    constructor(private logic: PeopleService) {
        console.log('init');
    }
}
