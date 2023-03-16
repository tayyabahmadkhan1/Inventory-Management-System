/* declarations: NzDrawerCustomComponent */

import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { AdminCComponent } from '../admin-c/admin-c.component';

@Component({
  selector: 'app-admin-drawer',
  templateUrl: './admin-drawer.component.html'
})
export class AdminDrawerComponent {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  value = 'ng';
  apiList: any[] = [];

  constructor(private drawerService: NzDrawerService, private http: HttpClient ) {}

  openTemplate(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Template',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzContent: this.drawerTemplate,
      nzContentParams: {
        value: this.value
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Template) open');
    });

    drawerRef.afterClose.subscribe(() => {
      console.log('Drawer(Template) close');
    });
  }

  getData() {
    this.http.get<any[]>('https://localhost:7089/api/Admin/ViewAdminsList').subscribe((response) => {
      this.apiList = response;
    });
  }

  openComponent(): void {
    const drawerRef = this.drawerService.create<AdminCComponent, { value: string }, string>({
      nzTitle: 'Admin Form',
      nzFooter: '',
      nzExtra: '',
      nzContent: AdminCComponent,
      nzContentParams: {
        value: this.value
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  editUser(item: any) 
    {
      const drawerRef = this.drawerService.create<AdminCComponent, { value: any }, string>({
        nzTitle: 'AdminForm',
        nzContent: AdminCComponent,
        nzContentParams: {
          value: item
        }
      });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });
  
    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  
    drawerRef.open();
  }
}

