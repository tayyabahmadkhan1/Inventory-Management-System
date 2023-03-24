import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ItemServiceService } from '../item-service.service';
import { ItemCComponent } from '../item-c/item-c.component';

@Component({
  selector: 'app-item-drawer',
  templateUrl: './item-drawer.component.html'
})
export class ItemDrawerComponent {
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  value = 'ng';
  apiList : any []=[];
  searchTerm: any;

  constructor(private drawerService: NzDrawerService, private ServiceObj: ItemServiceService, private notification :NzNotificationService) {}

  ngOnInit(){
    this.GetItem();
  }
  
  ngOnChanges(){
    this.searchItem();
  }

  searchItem() {
    if (this.searchTerm === '') {
      this.GetItem();
    } else {
      this.apiList = this.apiList.filter(item => item.item_name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }
  

  GetItem(){
    this.ServiceObj.GetItem().subscribe((Response=>{
      this.apiList=Response;
      console.log(Response);
    }));
  }

  DeleteItem(id :any){
    this.ServiceObj.DeleteItem(id).subscribe((Response=>{
      console.log(Response);
      this.GetItem();
      this.notification.create("sucess", "Item Deleted Successfully","")
     }));
  }

  EditItem(item: any) 
    {
      const drawerRef = this.drawerService.create<ItemCComponent, { value: any }, string>({
        nzTitle: 'Item Form',
        nzContent: ItemCComponent,
        nzContentParams: {
          value: item,
          getI : () => {
            this.GetItem();
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
    const drawerRef = this.drawerService.create<ItemCComponent, { getI:any }, string>({
      nzTitle: 'Item Form',
      nzFooter: '',
      nzExtra: '',
      nzContent: ItemCComponent,
      nzContentParams: {
        value: this.value,
        getI : () => {
          this.GetItem();
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