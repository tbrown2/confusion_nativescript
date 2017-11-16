import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component ({
	selector: 'app-menu', 
	moduleId: module.id,
	templateUrl: './menu.component.html'
//where we would specify the scss class
})
	
export class MenuComponent implements OnInit {

	dishes: Dish[];
	errMess: string;

	constructor(private dishservice: DishService,
		@Inject('BaseURL') private BaseURL) { }

	ngOnInit() {
		this.dishservice.getDishes()
			.subscribe(dishes => this.dishes = dishes,
				errmess => this.errMess = <any>errmess);
	}
}