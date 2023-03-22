import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { OrderServiceService } from '../order-service.service';
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

  constructor(private drawerRef: NzDrawerRef<string>, _serviceObject : OrderServiceService,private notification : NzNotificationService) {
    this.OrderForm = new FormGroup({

      'Order_Id': new FormControl(''),
      'OrderDate': new FormControl(''),
      'Status' : new FormControl('Pending'),
      'OrderQuantity': new FormControl(''),
      'ItemId': new FormControl('')
    })

    this.serviceObject = _serviceObject;
  }

  ngOnInit() {
    
    this.OrderForm.get('OrderDate')?.setValue(this.value.orderDate);
    this.OrderForm.get('Status')?.setValue(this.value.orderDate);
    this.OrderForm.get('OrderQuantity')?.setValue(this.value.OrderQuantity);
  }

  Add_UpdateOrder(formdata :any){

    this.serviceObject.Add_UpdateOrder(formdata).subscribe((Response =>{
      console.log(Response);
      this.getO();
      this.notification.create("sucess", "Order Saved Successfully","")
     }));
  }

  onSubmit(){
    let formData = new FormData();

    if(this.value.order_Id==null)//Add
    {
      formData.append('orderDate',this.OrderForm.value.Status);
      formData.append('status',this.OrderForm.value.OrderQuantity);
      formData.append('orderQuantity',this.OrderForm.value.OrderDate);
      formData.append('customerId',this.OrderForm.value.OrderDate);

    }
    else//Update
    {
      formData.append('order_id',this.OrderForm.value.OrderDate);
      formData.append('orderDate',this.OrderForm.value.Status);
      formData.append('status',this.OrderForm.value.OrderQuantity);
      formData.append('orderQuantity',this.OrderForm.value.OrderDate);
      formData.append('customerId',this.OrderForm.value.OrderDate);
    }
    
    this.Add_UpdateOrder(formData);
    this.drawerRef.close();
  }
}
