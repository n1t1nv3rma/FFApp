import { Component } from '@angular/core';

import { ListPage } from '../list/list';
import { ListDetailPage } from '../list-detail/list-detail';
import { ListFavouritePage } from '../list-favourite/list-favourite';
import { ListBirthdayPage } from '../list-birthday/list-birthday';
import { AboutPage } from '../about/about';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ListPage;
  tab2Root: any = ListFavouritePage;
  tab3Root: any = ListBirthdayPage;
  tab4Root: any = AboutPage;

  constructor() {

  }
}
