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

  get() 
{
    let data: any;
    let promise = new Promise((resolve, reject) => {
      console.log("in promise...");
      data = this._appService.getRequest();
    }).then(() => {
         console.log("in then...");
         console.log(data);
    });
  }
}
