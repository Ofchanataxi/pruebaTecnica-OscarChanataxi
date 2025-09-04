import { Component } from '@angular/core';
import { PozosComponent } from './components/pozos/pozos.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [PozosComponent]
})
export class AppComponent {}
