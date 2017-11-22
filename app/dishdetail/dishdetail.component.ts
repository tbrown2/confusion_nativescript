import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router'; 
import 'rxjs/add/operator/switchMap';

@Component ({
	selector: 'app-dishdetail', 
	moduleId: module.id,
	templateUrl: './dishdetail.component.html'
//where we would specify the scss class
})
	
export class DishdetailComponent implements OnInit {

	dish: Dish;
	comment: Comment;
	errMess: string;

	constructor(private dishservice: DishService,
		@Inject('BaseURL') private BaseURL,
		private route: ActivatedRoute,
		private routerExtensions: RouterExtensions) { }

	ngOnInit() {
		this.route.params
			.switchMap( (params: Params) => 
				this.dishservice.getDish(+params['id']) )
			.subscribe(
				dish => this.dish = dish,
				errmess => this.errMess = errmess );
	}

	goBack() {
		this.routerExtensions.back();
	}
}