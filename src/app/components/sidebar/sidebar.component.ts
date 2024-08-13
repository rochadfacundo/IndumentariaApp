import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [StyleClassModule,RippleModule,CommonModule,SidebarModule,ButtonModule,AvatarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

}
