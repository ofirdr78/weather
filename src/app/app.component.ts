import { Component } from '@angular/core';
import { AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  city: string;
  constructor(private _appService: AppService) {

  }

  get() {
    console.log(this._appService.getRequest());
  }
  
}
