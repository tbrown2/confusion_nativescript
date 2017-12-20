import { Component } from '@angular/core';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import {login, LoginResult } from 'ui/dialogs';
import { getString, setString } from 'application-settings';


@Component({
	selector: 'drawer-content',
	templateUrl: './shared/drawer/drawer.component.html',

})

export class DrawerComponent {
	constructor (private fonticon: TNSFontIconService) {}

	displayLoginDialog() {
		//should encrypt password
		let options = {
			title: "Login",
			message: "Type your login credentials",
			userName: getString("userName", ""),
			password: getString("password",""),
			okButtonText: "Login",
			cancelButton: "Cancel"
		}

		login(options)
            .then((loginResult: LoginResult) => {
                setString("userName", loginResult.userName);
                setString("password", loginResult.password);
            },
            () => { console.log('Login cancelled'); 
        });
	}
}