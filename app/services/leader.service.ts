//allows us to draw the dish information from the service
import { Injectable } from '@angular/core';
import { Leader }from '../shared/leader';

import { Observable } from 'rxjs/Observable';
 //using http protocol for communication with server
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
 //need to process the incoming messages
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable() 
export class LeaderService {
	constructor(
		public http: Http,
		private processHTTPMsgService: ProcessHTTPMsgService){}

	getleaders(): Observable<Leader[]> {
		return this.http.get(baseURL + 'leaders')
                .map(res => { return this.processHTTPMsgService.extractData(res); })
                .catch(error => { return this.processHTTPMsgService.handleError(error); });
		}

	 getLeader(id: number): Observable<Leader> {
		return  this.http.get(baseURL + 'leaders/'+ id)
                .map(res => { return this.processHTTPMsgService.extractData(res); })
                .catch(error => { return this.processHTTPMsgService.handleError(error); });
		}

	getFeaturedLeader(): Observable<Leader>{
		return this.http.get(baseURL + 'leaders?featured=true')
                .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
                .catch(error => { return this.processHTTPMsgService.handleError(error); });
		}
}