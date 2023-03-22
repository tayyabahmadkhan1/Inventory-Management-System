import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {WarehouseCComponent } from '../warehouse-c/warehouse-c.component';
import { WarehouseServiceService } from '../warehouse-service.service';

@Component({
  selector: 'app-warehouse-drawer',
  templateUrl: './warehouse-drawer.component.html'
})

export class WarehouseDrawerComponent {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;

  value = 'ng';
  apiList: any[] = [];
  constructor(private drawerService: NzDrawerService, private ServiceObj: WarehouseServiceService, private notification :NzNotificationService) {}

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

  ngOnInit(){
    this.GetWarehouse();
  }

  openComponent(): void {
    const drawerRef = this.drawerService.create<WarehouseCComponent, { getW:any }, string>({
      nzTitle: 'Warehouse Form',
      nzFooter: '',
      nzExtra: '',
      nzContent: WarehouseCComponent,
      nzContentParams: {
        value: this.value,
        getW : () => {
            this.GetWarehouse();
        }
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  }

  GetWarehouse(){
    this.ServiceObj.GetWarehouse().subscribe((Response=>{
      this.apiList=Response;
      console.log(Response);
    }));
  }

  DeleteWarehouse(id :any){
    this.ServiceObj.DeleteWarehouse(id).subscribe((Response=>{
      console.log(Response);
      this.GetWarehouse();
      this.notification.create("sucess", "Warehouse Deleted Successfully","")
     }));
  }

  editWarehouse(item: any) 
    {
      const drawerRef = this.drawerService.create<WarehouseCComponent, { value: any }, string>({
        nzTitle: 'Warehouse Form',
        nzContent: WarehouseCComponent,
        nzContentParams: {
          value: item,
          getW : () => {
            this.GetWarehouse();
        }
        }
      });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });
  
    drawerRef.afterClose.subscribe(data => {
      if (typeof data === 'string') {
        this.value = data;
      }
    });
  
    drawerRef.open();
  }
}