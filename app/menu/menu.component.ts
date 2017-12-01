import { Component, OnInit, Inject, ChangeDetectorRef} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import {DrawerPage} from '../shared/drawer/drawer.page';
@Component ({
	selector: 'app-menu', 
	moduleId: module.id,
	templateUrl: './menu.component.html'
//where we would specify the scss class
})
	
export class MenuComponent extends DrawerPage implements OnInit {

	dishes: Dish[];
	errMess: string;

	constructor(private dishservice: DishService,
		private changeDetectorRef: ChangeDetectorRef,
		@Inject('BaseURL') private BaseURL) { 
			super(changeDetectorRef);
	}

	ngOnInit() {
		this.dishservice.getDishes()
			.subscribe(dishes => this.dishes = dishes,
				errmess => this.errMess = <any>errmess);
	}
}