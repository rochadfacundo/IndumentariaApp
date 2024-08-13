import { ChangeDetectorRef, Component, Input} from '@angular/core';
import { User } from '../../classes/user';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';;
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MediaMatcher} from '@angular/cdk/layout';
import { ListProductsComponent } from '../../pages/dashboard/list-products/list-products.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ListProductsComponent,MatToolbarModule,MatButtonModule,MatIconModule,MatSidenavModule,MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

@Input() userLog!:User;

mobileQuery: MediaQueryList;

fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);



private _mobileQueryListener: () => void;

constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
  this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
}

ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}

shouldRun = true;///(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

}
