import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router'; 
import 'rxjs/add/operator/switchMap';
import { FavoriteService } from '../services/favorite.service';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { Toasty } from 'nativescript-toasty';
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
	avgstars: string;
	numcomments: number;
	favorite: boolean = false;

	constructor(private dishservice: DishService,
		@Inject('BaseURL') private BaseURL,
		private route: ActivatedRoute,
		private routerExtensions: RouterExtensions,
		private favoriteservice: FavoriteService,
		private fonticon: TNSFontIconService) { }

	ngOnInit() {
		this.route.params
			.switchMap( (params: Params) => 
				this.dishservice.getDish(+params['id']) )
			.subscribe(
				dish => {
					this.dish = dish;
					//check if dish is in favorite, then check how many commments in the comments array 
					this.favorite = this.favoriteservice.isFavorite(this.dish.id);
					this.numcomments = this.dish.comments.length;

					let total = 0;
					this.dish.comments.forEach(comment => total += comment.rating);
					this.avgstars = (total/this.numcomments).toFixed(2);
				},
				errmess => this.errMess = errmess );
	}

	addToFavorites() {
		if(!this.favorite) {
			this.favorite = this.favoriteservice.addFavorite(this.dish.id);
			const toast = new Toasty('Added dish ' + this.dish.id, 'short', 'bottom');
			toast.show();
		}
	}

	goBack() {
		this.routerExtensions.back();
	}
}