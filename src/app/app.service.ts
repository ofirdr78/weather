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

  async getRequest(): Promise<any> {
    console.log("in getRquest...");
    return this.http.get("http://api.apixu.com/v1/current.json?key=3682dce3352d42d2a2d63402170607&q=Paris").toPromise();
  }


}
