import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <header><h1>Business logic sample</h1></header>
  <main>
    <all-in-one></all-in-one>
  </main>
  <footer> a footer goes here</footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
}
