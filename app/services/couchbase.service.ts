import { Injectable } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase';

@Injectable()
export class CouchbaseService {
	private database: any;

	constructor() {
		//if its already open we will just open the reference to it
		this.database = new Couchbase("confusion");

	}

	public getDocument(docId: string) {
		//returns the entire document 
		//will return null if there is nothing

		return this.database.getDocument(docId);
	}

	//creating a document with a precpecified id
	public createDocument(data: any, docId: string) {
		
		return this.database.createDocument(data, docId);
	}

	public updateDocument(docId: string, data: any) {
		return this.database.updateDocument(docId, data);
	}

	public deleteDocument(docId: string) {
		return this.database.deleteDocument(docId);
	}
}