import {Component} from '@angular/core';
import {AppService} from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  city: any;
  data: any;
  inputCity: string;
  resCity: string;
  resLocation: string;
  resCountry: string;
  resTemp: string;
  foundLocation: boolean;
  fullTemperatureText: string;
  weatherIcon: string;
  textAddition: string;
  options: string [];
  selectedValue: number;
  cityNoSpaces: string;
// key: AIzaSyB583Fudf19zT_aB9W6Wzsnt0NPZ0B8A7Y

  constructor(private appService: AppService) {
    this.inputCity = '';
    this.resLocation = '';
    this.resCountry = '';
    this.resTemp = '';
    this.foundLocation = false;
    this.weatherIcon = '';
    this.selectedValue = 0;
    this.cityNoSpaces = ''; 
    this.fullTemperatureText = '';
  
  }

  async getCity(inputCity) {
     try {
      const cityResponse = await this.appService.getCity(inputCity);
      this.foundLocation = true;
      this.city = cityResponse.json();
      console.log(`AppComponent::get:: got response: ${cityResponse}`);
      this.resCity = this.city.predictions[0].structured_formatting.main_text;
      this.options = this.city.predictions;

    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
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
      // const response = await this.appService.getRequest(this.city.predictions[this.selectedValue].structured_formatting.main_text);
      const response = await this.appService.getRequest(this.inputCity);
      this.data = response.json();
      console.log(`AppComponent::get:: got response: ${response}`);
      this.resLocation = this.data.location.name;
      this.resCountry = this.data.location.country;
      this.resTemp = this.data.current.temp_c;
      this.checkTemp(this.resTemp);
      this.fulltext();
      this.inputCity = '';


    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }

  }

   async fulltext()
 {
    try {
       this.fullTemperatureText = await `The temperature today in ${this.resLocation}, ${this.resCountry} is ${this.resTemp}'C. ${this.textAddition}`;
    }
     catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
 } 

  checkTemp(temp) {
    if (temp > 20) {
      this.weatherIcon = "/assets/hot.png";
      this.textAddition = "Hot like HELL!";
      return;
    }
    if (temp > 5 ) {
      this.weatherIcon = "/assets/cloud.png";
      this.textAddition = "Nice weather indeed!";
      return;
    }
    this.weatherIcon = "/assets/storm.png";
    this.textAddition = "My balls became ice cubes!"
  }
}
