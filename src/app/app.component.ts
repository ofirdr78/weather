import {Component} from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  city: string;
  data: any;

  constructor(private appService: AppService) {

  }

  async get() {
    // this.appService.getRequest()
    //   .then(res => {
    //     console.log(`AppComponent::get:: got response: ${res}`);
    //     this.data = res.json();
    //   })
    //   .catch(err => {
    //     console.error(`AppComponent::get:: errored with: ${err}`);
    //   });

    try {
      const response = await this.appService.getRequest();
      this.data = response.json();
      console.log(`AppComponent::get:: got response: ${response}`);

    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }

  }
}
