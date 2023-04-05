import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators, FormArray } from '@angular/forms';
import { Input } from '@angular/core';
import { OrderServiceService } from '../order-service.service';
import { ItemServiceService } from 'src/app/item/item-service.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InventoryServiceService } from 'src/app/inventory/inventory-service.service';
import { ItemCComponent } from 'src/app/item/item-c/item-c.component';

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
  OrderStatus: string[] = ["Cancelled", "In Process", "Delivered"];
  flag:any=true;
  MoreItems: FormArray;
  TotalPrice: any;
  ItemComponent :  ItemCComponent | any;

  constructor(private drawerRef: NzDrawerRef<string>, _serviceObject : OrderServiceService,private notification : NzNotificationService, _IserviceObject:ItemServiceService, _InserviceObject:InventoryServiceService) {
    this.MoreItems = new FormArray<any>([])
    this.OrderForm = new FormGroup({
      MoreItems : this.MoreItems,

      'Order_Id': new FormControl(''),
      'OrderDate': new FormControl('', Validators.required),
      'Status' : new FormControl('', Validators.required),
      'OrderQuantity': new FormControl(),
      'CustomerId': new FormControl(''),
      items: new FormArray([]),
      'ItemName' : new FormControl([]),
      'ItemCategory': new FormControl('')
    })


    this.serviceObject = _serviceObject;
    this.ItemServiceObject = _IserviceObject;
    this.InventoryServiceObject=_InserviceObject;

    this.GetItem();
    this.addItem();

    
  }

  ngOnInit() {

    this.OrderForm.get('Order_Id')?.setValue(this.value.order_Id);
    
    this.OrderForm.get('OrderDate')?.setValue(this.value.orderDate);
    this.OrderForm.get('Status')?.setValue(this.value.status);
    this.OrderForm.get('OrderQuantity')?.setValue(this.value.orderQuantity);
    this.OrderForm.get('CustomerId')?.setValue(this.value.customerId);
    this.OrderForm.get('ItemName')?.setValue(this.value.itemname);
    this.OrderForm.get('ItemPrice')?.setValue(this.value.price);
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

  getstock(index:any){
    const name = this.items.controls[index].get('name')?.value;
    let filteredItems=this.ItemList.filter((I) => I.item_name === name);
    if (filteredItems.length > 0) {
      return filteredItems[0].stockquantity;
    }
    return null;
  }

  updateStockQ(name:any , sQuantity:any){

    for(let i=0; i<this.ItemList.length ; i++)
    {
      if(this.ItemList[i].item_name === name)
      {
        this.ItemList[i].stockquantity = this.ItemList[i].stockquantity - sQuantity;
      }

    } 

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
      quantity: new FormControl('',Validators.required),
    });
    this.items.push(newItem);
  }


  GetItem(){
    this.ItemServiceObject.GetItem().subscribe((Response =>{
      this.ItemList = Response;
     }));
  }

  Add_UpdateItem(formdata :any){

    this.ItemServiceObject.Add_UpdateItem(formdata).subscribe((Response =>{
      console.log('AddUpdateItem',Response);
     }));
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    const items = this.OrderForm.get('items') as FormArray;
    for (let i = 0; i < items.length; i++) {
      const name = items.controls[i].get('name')?.value;
      const quantity = items.controls[i].get('quantity')?.value;
      const item = this.ItemList.find(item => item.itemname === name);
      if (item) {
        const sellPrice = item.sellprice;
        console.log('1',item.sellprice);
        console.log('2',item.sell_price);
        totalPrice += quantity * sellPrice;
      }
    }
    this.TotalPrice = totalPrice;
  }
  

  onSubmit(){
    // this.Add_UpdateOrder(formData);
    // this.drawerRef.close();
  }

  totalprice(){
    let total = 0;
    this.ItemList.forEach((item)=>{
      total += this.OrderForm.value.OrderQuantity * item.SellPrice;
    });
    return total;
  }


 


  submit(){

    let formData = new FormData();

    if(this.value.order_Id==null)//Add
    {
      formData.append('orderDate',this.OrderForm.value.OrderDate);
      formData.append('status',this.OrderForm.value.Status);
  
      formData.append('itemname', this.OrderForm.value.items.map((item: any ) => item.name).join(', '));
      formData.append('orderQuantity', this.OrderForm.value.items.map((item:any ) => item.quantity).join(', '));

    }
    else//Update
    {
      formData.append('order_Id',this.OrderForm.value.Order_Id);
      formData.append('orderDate',this.OrderForm.value.OrderDate);
      formData.append('status',this.OrderForm.value.Status);

      formData.append('itemname', this.OrderForm.value.items.map((item: { name: any; }) => item.name).join(', '));
      formData.append('orderQuantity', this.OrderForm.value.items.map((item: { quantity: any; }) => item.quantity).join(', '));
    }

    let namesArray:any[]=[];
    let quantityArray:any[]=[];
    let sum=0;
    let sum2=0;


    let totalPrice:any = 0;
    let costPrice:any=0;
    const itemNames:any = formData.get('itemname');
    const orderNames:any = formData.get('orderQuantity');

    
      namesArray = itemNames.split(', ');
      quantityArray = orderNames.split(', ');


      for (let i = 0; i < itemNames.length; i++) {
        let itemName = namesArray[i];
        let orderQuantity = parseInt(quantityArray[i]);
        let item = this.ItemList.find((item) => item.item_name === itemName);
        if (item) {
          console.log(item.item_name,": ",item.sell_price,orderQuantity);

          this.updateStockQ(item.item_name,orderQuantity);

          sum= item.sell_price * orderQuantity;
          sum2= item.cost_price * orderQuantity;

          totalPrice=sum + totalPrice;
          costPrice=sum2 + costPrice;
        }
    }

    formData.append('price',totalPrice);
    formData.append('cprice',costPrice);

    
    this.Add_UpdateOrder(formData);
    console.log('ItemList',this.ItemList);

    


    for(let i=0; i<this.ItemList.length; i++)
    {
      let formData2 = new FormData();
      console.log("working", i)
      let item = this.ItemList[i];
      formData2.append('item_Id',item.item_Id);

      formData2.append('item_name',item.item_name);

      formData2.append('description',item.description);
      formData2.append('cost_price',item.cost_price);
      formData2.append('sell_price',item.sell_price);
      formData2.append('inventoryIdItems',item.inventoryIdItems);
     
      formData2.append('stockquantity',item.stockquantity);
      
      formData2.append('imageurl',item.imageurl);
      formData2.append('itemcategory', item.itemcategory);

      this.Add_UpdateItem(formData2);
    }

    this.GetItem();

    

    this.drawerRef.close();
  }
}