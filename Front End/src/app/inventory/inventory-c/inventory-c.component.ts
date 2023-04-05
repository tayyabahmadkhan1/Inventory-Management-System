import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Input } from '@angular/core';
import { ItemServiceService } from 'src/app/item/item-service.service';
import {OrderServiceService } from 'src/app/order/order-service.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InventoryServiceService } from 'src/app/inventory/inventory-service.service';

@Component({
  selector: 'app-inventory-c',
  templateUrl: './inventory-c.component.html',
  styleUrls: ['./inventory-c.component.css']
})
export class InventoryCComponent {

  ItemObject : ItemServiceService;
  OrderObject : OrderServiceService;
  ItemList: Array<any> = [];
  OrderList: Array<any> = [];
  month:any;
  year:any;
  profit:any;

  constructor(_ItemObject : ItemServiceService , _OrderObject : OrderServiceService)
  {
    this.ItemObject = _ItemObject;
    this.OrderObject = _OrderObject;

    this.GetItem();
    this.GetOrder();
  }

  GetItem(){
    this.ItemObject.GetItem().subscribe((Response =>{
      this.ItemList = Response;
     }));
  }

  GetOrder(){
    this.OrderObject.GetOrder().subscribe((Response =>{
      this.OrderList = Response;
     }));
  }

  monthlyProfit(month: number, year: number): any {
    this.profit = 0;

    console.log('Month value from function', month)

    console.log('year value from function', year)

    console.log("order list value ", this.OrderList)
  
    this.OrderList.forEach(order => {

      let orderMonth = new Date(order.orderDate).getMonth();
      const orderYear = new Date(order.orderDate).getFullYear();

      orderMonth=  orderMonth + 1;

      console.log('Month value from OL', orderMonth)

      console.log('year value from OL', orderYear)
  
      if (order.status === 'Delivered' && orderMonth === month && orderYear === year) {

        console.log('orderprice value from OL', order.price)

        console.log('costprice from OL', order.cprice)

        this.profit += order.price - order.cprice;
      }
      else if(order.status === 'Delivered' && month === undefined && orderYear === year)
      {
        this.profit += order.price - order.cprice;
      }
    });
  
    console.log(this.profit);

  }


}