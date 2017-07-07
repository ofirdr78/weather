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
  options: string [];
  selectedValue: number;
  cityNoSpaces: string;
  daySVG: string;
  showWeatherStats: boolean;
  dayNightText: string;
  condition: string;
  humidity: number;

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
    this.showWeatherStats = false;
  
  }

  async getCity(inputCity) {
     try {
      this.fullTemperatureText = '';
      this.dayNightText = '';
      this.showWeatherStats = false;
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
      this.condition = this.data.current.condition.text.toLowerCase( );
      this.humidity = this.data.current.humidity;
      this.fulltext();
       if (this.data.current.is_day) {
        this.daySVG = "/assets/sun.svg";
      } else {
          this.daySVG = "/assets/moon.svg";
      }
      this.showWeatherStats = true;
      this.inputCity = '';
     
    

    } catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }

  }

   async fulltext()
 {
    try {
       this.dayNightText = "It is ";
       this.fullTemperatureText = await `in ${this.resLocation}, ${this.resCountry}. The temperature is ${this.resTemp}\u00b0c 
        with ${this.humidity}% humidity. `;
       this.fullTemperatureText += await ` The condition is ${this.condition}.`;
    }
     catch (ex) {
      console.error(`AppComponent::get:: errored with: ${ex}`);
    }
 } 

}
