import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { ItemServiceService } from '../item-service.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-item-c',
  templateUrl: './item-c.component.html',
  styleUrls: ['./item-c.component.css']
})
export class ItemCComponent {
  @Input() value: any;
  @Input() getI !:()=>void;
  ItemForm :FormGroup
  serviceObject: ItemServiceService;

  constructor(private drawerRef: NzDrawerRef<string>, _serviceObject : ItemServiceService,private notification : NzNotificationService) {
    this.ItemForm = new FormGroup({

      'Item_Id': new FormControl(''),
      'ItemName': new FormControl(''),
      'Description' : new FormControl(''),
      'Costprice': new FormControl(''),
      'Sellprice': new FormControl(''),
      'InventoryId': new FormControl('')
    })

    this.serviceObject = _serviceObject;
  }

  ngOnInit() {

    this.ItemForm.get('Item_Id')?.setValue(this.value.item_Id);


    this.ItemForm.get('ItemName')?.setValue(this.value.item_name);
    this.ItemForm.get('Description')?.setValue(this.value.description);
    this.ItemForm.get('Costprice')?.setValue(this.value.cost_price);
    this.ItemForm.get('Sellprice')?.setValue(this.value.sell_price);
    this.ItemForm.get('InventoryId')?.setValue(this.value.inventoryIdItems);
  }

  Add_UpdateItem(formdata :any){

    this.serviceObject.Add_UpdateItem(formdata).subscribe((Response =>{
      console.log(Response);
      this.getI();
      this.notification.create("sucess", "Item Saved Successfully","")
     }));
  }

  onSubmit(){
    let formData = new FormData();

    if(this.value.item_Id==null)//Add
    {
      formData.append('item_name',this.ItemForm.value.ItemName);
      formData.append('description',this.ItemForm.value.Description);
      formData.append('cost_price',this.ItemForm.value.Costprice);
      formData.append('sell_price',this.ItemForm.value.Sellprice);
      formData.append('inventoryIdItems',this.ItemForm.value.InventoryId);

    }
    else//Update
    {
      formData.append('item_Id',this.ItemForm.value.Item_Id);
      formData.append('item_name',this.ItemForm.value.ItemName);
      formData.append('description',this.ItemForm.value.Description);
      formData.append('cost_price',this.ItemForm.value.Costprice);
      formData.append('sell_price',this.ItemForm.value.Sellprice);
      formData.append('inventoryIdItems',this.ItemForm.value.InventoryId);
    }
    
    this.Add_UpdateItem(formData);
    this.drawerRef.close();
  }

}
