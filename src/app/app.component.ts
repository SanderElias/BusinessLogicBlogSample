import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <header><h1>Business logic sample</h1>
    <small>
      <form>
        <label><input type="radio" name="ver" value='1'>allInOne</label>
        <label><input type="radio" name="ver" value='2'>sepratedComponents</label>
        <label><input type="radio" name="ver" value='3' checked>SeparatedLogic</label>
        </form>
    </small>
  </header>
  <main>
    <all-in-one *ngIf="showWhat === 1"></all-in-one>
    <seprarated-lists *ngIf="showWhat === 2"></seprarated-lists>
    <seprarated-logic *ngIf="showWhat === 3"></seprarated-logic>
  </main>
  <footer> a footer goes here</footer>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'app';
  showWhat = 3;
  constructor(private ref: ElementRef) {}

  ngOnInit() {
    if (this.ref.nativeElement) {
      // ok im in the browser, do a q&d hack to show the right component!
      // really, don't do this in a production app!!!!
      document.forms[0].onchange = () =>
        (this.showWhat = +document.forms[0].ver.value);
    }
  }
}
