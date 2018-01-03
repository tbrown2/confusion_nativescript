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

//animation imports 
import { Page } from "ui/page";
import {Animation, AnimationDefinition } from "ui/animation";
import { View } from "ui/core/view";
import { SwipeDirection, SwipeGestureEventData } from "ui/gestures";
import { Color } from "color";
import * as enums from "ui/enums";

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

	//animation related variables
	showComments: boolean = false;

	cardImage: View;
	commentList: View;
	cardLayout: View;

	constructor(private dishservice: DishService,
		@Inject('BaseURL') private BaseURL,
		private route: ActivatedRoute,
		private routerExtensions: RouterExtensions,
		private favoriteservice: FavoriteService,
		private fonticon: TNSFontIconService,
		private page: Page) { }

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

	onSwipe(args: SwipeGestureEventData) {

    if (this.dish) {
      this.cardImage = <View>this.page.getViewById<View>("cardImage");
      this.cardLayout = <View>this.page.getViewById<View>("cardLayout");
      this.commentList = <View>this.page.getViewById<View>("commentList");

      if (args.direction === SwipeDirection.up && !this.showComments ) {
        this.animateUp();
      }
      else if (args.direction === SwipeDirection.down && this.showComments ) {
        this.showComments = false;
        this.animateDown();
      }
    }

  }

	showAndHideComments() {
      this.cardImage = <View>this.page.getViewById<View>("cardImage");
      this.cardLayout = <View>this.page.getViewById<View>("cardLayout");
      this.commentList = <View>this.page.getViewById<View>("commentList");

      if (!this.showComments ) {
        this.animateUp();
      }
      else if (this.showComments ) {
        this.showComments = false;
        this.animateDown();
      }
	}

	animateUp() {
		let definitions = new Array<AnimationDefinition>();
	    let a1: AnimationDefinition = {
	        target: this.cardImage,
	        scale: { x: 1, y: 0 },
	        translate: { x: 0, y: -200 },
	        opacity: 0,
	        duration: 500,
	        curve: enums.AnimationCurve.easeIn
	    };
	    definitions.push(a1);

	    let a2: AnimationDefinition = {
	        target: this.cardLayout,
	        backgroundColor: new Color("#ffc107"),
	        duration: 500,
	        curve: enums.AnimationCurve.easeIn
	    };
	    definitions.push(a2);

	    let animationSet = new Animation(definitions);

	    animationSet.play().then(() => {
	      this.showComments = true;
	    })
	    .catch((e) => {
	        console.log(e.message);
	    });

	}

	animateDown(){
		let definitions = new Array<AnimationDefinition>();
	    let a1: AnimationDefinition = {
	        target: this.cardImage,
	        scale: { x: 1, y: 1 },
	        translate: { x: 0, y: 0 },
	        opacity: 1,
	        duration: 500,
	        curve: enums.AnimationCurve.easeIn
	    };
	    definitions.push(a1);

	    let a2: AnimationDefinition = {
	        target: this.cardLayout,
	        backgroundColor: new Color("#ffffff"),
	        duration: 500,
	        curve: enums.AnimationCurve.easeIn
	    };
	    definitions.push(a2);

	    let animationSet = new Animation(definitions);

	    animationSet.play().then(() => {
	    })
	    .catch((e) => {
	        console.log(e.message);
	    });
	}

	
}