import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderServiceService } from '../order-service.service';
import { OrderCComponent } from '../order-c/order-c.component';

@Component({
  selector: 'app-order-drawer',
  templateUrl: './order-drawer.component.html'
})
export class OrderDrawerComponent {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  value = 'ng';
  apiList: any[] = [];
  apiList2:any;

  constructor(private drawerService: NzDrawerService, private ServiceObj: OrderServiceService, private notification :NzNotificationService) {}

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
    this.GetOrder();
  }

  GetItem(id:any){
    this.ServiceObj.GetItem(id).subscribe((Response=>{
      this.apiList2=Response;
      console.log(Response);
    }));
  }

  GetOrder(){
    this.ServiceObj.GetOrder().subscribe((Response=>{
      this.apiList=Response;
      console.log(Response);
    }));
  }

  DeleteOrder(id :any){
    this.ServiceObj.DeleteOrder(id).subscribe((Response=>{
      console.log(Response);
      this.GetOrder();
      this.notification.create("sucess", "Order Deleted Successfully","")
     }));
  }

  EditOrder(item: any) 
    {
      const drawerRef = this.drawerService.create<OrderCComponent, { value: any }, string>({
        nzTitle: 'Order Form',
        nzContent: OrderCComponent,
        nzContentParams: {
          value: item,
          getO : () => {
            this.GetOrder();
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

  openComponent(): void {
    const drawerRef = this.drawerService.create<OrderCComponent, { value: string }, string>({
      nzTitle: 'Order Form',
      nzFooter: '',
      nzExtra: '',
      nzContent: OrderCComponent,
      nzContentParams: {
        value: this.value,
        getO : () => {
          this.GetOrder();
      }
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
}