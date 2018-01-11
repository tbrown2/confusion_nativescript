import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { ListPicker } from 'ui/list-picker';
import { TextField } from "ui/text-field";
import { Page } from 'ui/page';

@Component({
	moduleId: module.id,
	templateUrl: './commentmodal.component.html'
})

export class CommentModalComponent {
	
	author: string;
	comment: string;
	rating: number;

	constructor (private params: ModalDialogParams, 
		private page: Page) {
	}
}
