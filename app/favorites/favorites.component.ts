import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/dish';
import { ListViewEventData, RadListView } from 'nativescript-telerik-ui/listview';
import { RadListViewComponent } from 'nativescript-telerik-ui/listview/angular';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { View } from 'ui/core/view';
import { confirm } from 'ui/dialogs';
import { Toasty } from 'nativescript-toasty';

@Component({
    selector: 'app-favorites',
    moduleId: module.id,
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent extends DrawerPage implements OnInit {
	//means that it is an array of dish type 
	//whenever you add or delete, the template view 
	//will automatically react to changes 
	//using specific animations (its a little different than Observable<Dish[]>)
    favorites: ObservableArray<Dish>;
    errMess: string;
    //viewchild gets access to view 
    @ViewChild('myListView') listViewComponent: RadListViewComponent;

    constructor(private favoriteservice: FavoriteService,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject('BaseURL') private BaseURL) {
            super(changeDetectorRef);
    }

    ngOnInit() {
        this.favoriteservice.getFavorites()
            .subscribe(favorites => this.favorites = new ObservableArray(favorites),
                errmess => this.errMess = errmess);
    }

    deleteFavorite(id: number) {

        let options = {
            title: "Confirm Delete",
            message: 'Do you want to delete Dish ' + id,
            okButtonText: 'Yes',
            cancelButtonText: 'No',
            neutralButtonText: 'Cancel'
        };

        confirm(options)
            .then((result: boolean) => {
                if (result) {

                    this.favorites = null;
                    this.favoriteservice.deleteFavorite(id)
                        .subscribe(favorites => {
                            const toast = new Toasty('Deleted Dish ' + id, 'short', 'bottom');
                            toast.show();
                            this.favorites = new ObservableArray(favorites);
                        },
                        errmess => this.errMess = errmess);

                }
                else{
                    console.log('Delete cancelled');
                }
            });
    }

    //read on the radlistview documentation
    public onCellSwiping(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var currentItemView = args.object;
        var currentView;

        //we need to recognize the amount of swipe that has been done
        if(args.data.x > 200) {

        }
        else if (args.data.x < -200) {

        }
    }
    //
    public onSwipeCellStarted(args: ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];

        var leftItem = swipeView.getViewById<View>('mark-view');
        var rightItem = swipeView.getViewById<View>('delete-view');
        //gives width to the left and right button
        //if you do a swipe that exceeds the limit, then the option button will appear 
        //it will stick for the user to interact with 
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth()/2;
    }

    public onSwipeCellFinished(args: ListViewEventData) {

    }

    public onLeftSwipeClick(args: ListViewEventData) {
        console.log('Left swipe click');
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onRightSwipeClick(args: ListViewEventData) {
        this.deleteFavorite(args.object.bindingContext.id);
        //delete favorite with the argument, tells us we need to delete the favorite
        //the parameter is the id for the item that needs to be deleted 
        //
        this.listViewComponent.listView.notifySwipeToExecuteFinished();
    }
}