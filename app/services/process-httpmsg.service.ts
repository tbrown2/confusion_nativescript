//processes the incoming http messages from the server side 
 import { Injectable } from '@angular/core';

 import { Observable } from 'rxjs/Observable';
 //using http protocol for communication with server
 import { Http, Response } from '@angular/http';
 import 'rxjs/add/observable/throw';

//we can now inject this by using the injectable decorator
 @Injectable()
 export class ProcessHTTPMsgService {
 	constructor() {

 	}

 	public extractData(res: Response) {
 		let body = res.json();
 		//return if not null else it will return an empty array 
 		return body || {};
 	}

 	//takes an error message which comes in as a response
 	// or if there is an error communicating with server we have any
 	//
 	public handleError(error: Response | any){
 		let errMsg: string;
 		//we have a response from server
 		if( error instanceof Response) {
 			const body = error.json();
 			const err = body.error || JSON.stringify(body);
 			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
 		}

 		else {
 			errMsg = error.message ? error.message : error.toString();
 		}
 		//we are going to throw an error 
 		return Observable.throw(errMsg);
 	}
 }