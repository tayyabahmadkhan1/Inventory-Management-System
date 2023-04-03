import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators, FormArray } from '@angular/forms';
import { Input } from '@angular/core';
import { OrderServiceService } from '../order-service.service';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InventoryServiceService } from 'src/app/inventory/inventory-service.service';

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
  InventoryServiceObject : InventoryServiceService;
  ItemList : any []=[];
  // InventoryList:any[]=[];
  OrderStatus: string[] = ["Pending", "In Process", "Delivered"];
  flag:any=true;
  MoreItems: FormArray;

  constructor(private drawerRef: NzDrawerRef<string>, _serviceObject : OrderServiceService,private notification : NzNotificationService, _IserviceObject:ItemServiceService, _InserviceObject:InventoryServiceService) {
    this.MoreItems = new FormArray<any>([])
    this.OrderForm = new FormGroup({
      MoreItems : this.MoreItems,

      'Order_Id': new FormControl(''),
      'OrderDate': new FormControl(''),
      'Status' : new FormControl(''),
      'OrderQuantity': new FormControl(''),
      'CustomerId': new FormControl(''),
      items: new FormArray([]),
      'ItemName' : new FormControl(''),
      'ItemCategory': new FormControl('')
    })


    this.serviceObject = _serviceObject;
    this.ItemServiceObject = _IserviceObject;
    this.InventoryServiceObject=_InserviceObject;

    this.GetItem();
    // this.GetInventory();

    
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

  get filteredItemList() {
    const category = this.OrderForm.get("ItemCategory")?.value;
    return this.ItemList.filter((I) => I.itemcategory === category);
  }

  get fItemList() {
    const category = this.items.controls[0].get('category')?.value;
    return this.ItemList.filter((I) => I.itemcategory === category);
  }

  getfitem(index:any){
    const category = this.items.controls[index].get('category')?.value;
    return this.ItemList.filter((I) => I.itemcategory === category);

  }

  get items() {
    return this.OrderForm.get('items') as FormArray;
  }

  get UniqueItemCategories() {
    const categories = this.ItemList.map(item => item.itemcategory); // get all item categories
    const uniqueCategories = [...new Set(categories)]; // use Set to get unique categories
    return uniqueCategories;
  }

  addItem() {
    const newItem = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
    this.items.push(newItem);
  }

  CreateItem(): any {
    return new FormGroup({
      Itemname: new FormControl('',Validators.required),
      Itemcategory: new FormControl('',Validators.required),
      Itemquantity: new FormControl('',Validators.required)
    });
  }


  GetItem(){
    this.ItemServiceObject.GetItem().subscribe((Response =>{
      console.log(Response)
      this.ItemList = Response;
     }));
  }

  // GetInventory(){
  //   this.InventoryServiceObject.GetInventory().subscribe((Response =>{
  //     console.log(Response)
  //     this.InventoryList = Response;
  //    }));
  // }

  onSubmit(){
    let formData = new FormData();

    if(this.value.order_Id==null)//Add
    {
      formData.append('orderDate',this.OrderForm.value.OrderDate);
      formData.append('status',this.OrderForm.value.Status);
      formData.append('orderQuantity',this.OrderForm.value.OrderQuantity);
      formData.append('customerId',this.OrderForm.value.CustomerId);
      formData.append('itemname',this.OrderForm.value.ItemName.join(' , '));

    }
    else//Update
    {
      formData.append('order_Id',this.OrderForm.value.Order_Id);
      formData.append('orderDate',this.OrderForm.value.OrderDate);
      formData.append('status',this.OrderForm.value.Status);
      formData.append('orderQuantity',this.OrderForm.value.OrderQuantity);
      formData.append('customerId',this.OrderForm.value.CustomerId);
      formData.append('itemname',this.OrderForm.value.ItemName.join(' , '));
    }
    this.Add_UpdateOrder(formData);
    this.drawerRef.close();
  }
}