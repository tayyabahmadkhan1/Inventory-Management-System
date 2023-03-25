import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { OrderServiceService } from '../order-service.service';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-order-c',
  templateUrl: './order-c.component.html',
  styleUrls: ['./order-c.component.css']
})
export class OrderCComponent {
  @Input() value: any;
  @Input() getO !:()=>void;
  OrderForm :FormGroup
  serviceObject: OrderServiceService;
  ItemServiceObject : ItemServiceService;
  ItemList : any []=[];

  constructor(private drawerRef: NzDrawerRef<string>, _serviceObject : OrderServiceService,private notification : NzNotificationService, _IserviceObject:ItemServiceService) {
    this.OrderForm = new FormGroup({

      'Order_Id': new FormControl(''),
      'OrderDate': new FormControl(''),
      'Status' : new FormControl(''),
      'OrderQuantity': new FormControl(''),
      'CustomerId': new FormControl(''),
      'ItemName' : new FormControl('')
    })

    this.serviceObject = _serviceObject;
    this.ItemServiceObject = _IserviceObject;

    this.GetItem();
  }

  ngOnInit() {

    this.OrderForm.get('Order_Id')?.setValue(this.value.order_Id);
    
    this.OrderForm.get('OrderDate')?.setValue(this.value.orderDate);
    this.OrderForm.get('Status')?.setValue(this.value.status);
    this.OrderForm.get('OrderQuantity')?.setValue(this.value.orderQuantity);
    this.OrderForm.get('CustomerId')?.setValue(this.value.customerId);
    this.OrderForm.get('ItemName')?.setValue(this.value.itemname);
  }

  Add_UpdateOrder(formdata :any){

    this.serviceObject.Add_UpdateOrder(formdata).subscribe((Response =>{
      console.log(Response);
      this.getO();
      this.notification.create("sucess", "Order Saved Successfully","")
     }));
  }

  GetItem(){

    this.ItemServiceObject.GetItem().subscribe((Response =>{
      console.log(Response)
      this.ItemList = Response;
     }));
  }

  onSubmit(){
    let formData = new FormData();

    if(this.value.order_Id==null)//Add
    {
      formData.append('orderDate',this.OrderForm.value.OrderDate);
      formData.append('status',this.OrderForm.value.Status);
      formData.append('orderQuantity',this.OrderForm.value.OrderQuantity);
      formData.append('customerId',this.OrderForm.value.CustomerId);
      formData.append('itemname',this.OrderForm.value.ItemName);

    }
    else//Update
    {
      formData.append('order_Id',this.OrderForm.value.Order_Id);
      formData.append('orderDate',this.OrderForm.value.OrderDate);
      formData.append('status',this.OrderForm.value.Status);
      formData.append('orderQuantity',this.OrderForm.value.OrderQuantity);
      formData.append('customerId',this.OrderForm.value.CustomerId);
      formData.append('itemname',this.OrderForm.value.ItemName);
    }
    
    this.Add_UpdateOrder(formData);
    this.drawerRef.close();
  }
}
