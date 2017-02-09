import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ConnectivityService } from '../providers/connectivity-service';
import { Sql } from '../providers/sql';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ListPage } from '../pages/list/list';
import { ListDetailPage } from '../pages/list-detail/list-detail';
// import { AddListPage } from '../pages/add-list/add-list';
import { ListFavouritePage } from '../pages/list-favourite/list-favourite';
import { ListBirthdayPage, ModalContentPage } from '../pages/list-birthday/list-birthday';
// import { ListBirthdayDetailPage } from '../pages/list-birthday/list-birthday-detail';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AboutPage,
    ListPage,
    ListDetailPage,
    ListFavouritePage,
    ListBirthdayPage,
    ModalContentPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AboutPage,
    ListPage,
    ListDetailPage,
    ListFavouritePage,    
    ListBirthdayPage,
    ModalContentPage
  ],
  providers: [
    Sql, 
    ConnectivityService, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
