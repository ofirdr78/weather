import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';


@Injectable()
export class AppService {
  newData: any;


  constructor(private http: Http) {
    this.newData = {};

  }

  async getCity(city): Promise<any> {
    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=geocode&key=AIzaSyB583Fudf19zT_aB9W6Wzsnt0NPZ0B8A7Y`;
    return this.http.get(url).toPromise();

  }
  async getRequest(city): Promise<any> {
    let url = "http://api.apixu.com/v1/current.json?key=3682dce3352d42d2a2d63402170607&q=" + city;
    console.log("url: " + url );
    return this.http.get("http://api.apixu.com/v1/current.json?key=3682dce3352d42d2a2d63402170607&q=" + city).toPromise();
  }


}
