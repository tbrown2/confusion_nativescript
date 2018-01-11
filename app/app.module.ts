import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { DrawerComponent } from "./shared/drawer/drawer.component";
import { NativeScriptUIListViewModule } from 'nativescript-pro-ui/listview/angular';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserAuthComponent } from './userauth/userauth.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationModalComponent } from "./reservationmodal/reservationmodal.component";
import { CommentModalComponent } from "./commentmodal/commentmodal.component";
import { DishService } from "./services/dish.service";
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { PlatformService } from './services/platform.service';

import { ProcessHTTPMsgService } from "./services/process-httpmsg.service";
import { FavoriteService } from './services/favorite.service';
import { CouchbaseService } from './services/couchbase.service';
import {baseURL } from './shared/baseurl';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUISideDrawerModule } from 'nativescript-pro-ui/sidedrawer/angular';
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.min.css'
        }),
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        ReactiveFormsModule

    ],
    declarations: [
        AppComponent,
        ContactComponent,
        MenuComponent,
        DishdetailComponent,
        DrawerComponent,
        HomeComponent,
        AboutComponent,
        FavoritesComponent,
        ReservationComponent,
        ReservationModalComponent,
        CommentModalComponent,
        UserAuthComponent
    ],
    providers: [
        {provide: 'BaseURL', useValue: baseURL},
        DishService,
        ProcessHTTPMsgService,
        PromotionService,
        LeaderService,
        FavoriteService,
        CouchbaseService,
        PlatformService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        ReservationModalComponent,
        CommentModalComponent
    ],
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
