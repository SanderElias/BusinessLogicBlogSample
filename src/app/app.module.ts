import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AllInOneComponent } from './samples/all-in-one/all-in-one.component';
import { SepraratedListsComponent } from './samples/seprarated-lists/seprarated-lists.component';
import { PersonsComponent } from './samples/seprarated-lists/persons/persons.component';
import { MoviesComponent } from './samples/seprarated-lists/movies/movies.component';
import { StarshipsComponent } from './samples/seprarated-lists/starships/starships.component';
import { SepraratedLogicComponent } from './samples/seprarated-logic/seprarated-logic.component';
import {
  PeopleService,
  SwapiService,
  StarshipsService,
  MovieService
} from './samples/separated-logic.service';
import { Movies1Component } from './samples/separated-logic/movies1/movies1.component';
import { StarShip1Component } from './samples/separated-logic/star-ship1/star-ship1.component';

@NgModule({
  declarations: [
    AppComponent,
    AllInOneComponent,
    SepraratedListsComponent,
    PersonsComponent,
    MoviesComponent,
    StarshipsComponent,
    SepraratedLogicComponent,
    Movies1Component,
    StarShip1Component
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [PeopleService, SwapiService, StarshipsService, MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
