import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { WarehouseServiceService } from '../warehouse-service.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-warehouse-c',
  templateUrl: './warehouse-c.component.html',
  styleUrls: ['./warehouse-c.component.css']
})

export class WarehouseCComponent {
  @Input() value: any;
  @Input() getW !:()=>void;
  WarehouseForm :FormGroup
  serviceObject: WarehouseServiceService;

  constructor(private drawerRef: NzDrawerRef<string>, _serviceObject : WarehouseServiceService,private notification : NzNotificationService) {
    this.WarehouseForm = new FormGroup({

      'WarehouseLocation': new FormControl('')
    })

    this.serviceObject = _serviceObject;
  }

  ngOnInit() {//Edit Patch value

    this.WarehouseForm.get('WarehouseLocation')?.setValue(this.value.warehouse_location)
  }

  AddWarehouse(formdata :any){

    this.serviceObject.AddWarehouse(formdata).subscribe((Response =>{
      console.log(Response);
      this.getW();
      this.notification.create("sucess", "Record Saved Successfully","")
     }));
  }

  onSubmit(){
    let formData = new FormData();

    if(this.value.warehouse_Id==null)
    {
      formData.append('warehouse_location',this.WarehouseForm.value.WarehouseLocation);
    }
    else
    {
      formData.append('warehouse_id',this.value.warehouse_Id);
      formData.append('warehouse_location',this.WarehouseForm.value.WarehouseLocation);
    }
    
    this.AddWarehouse(formData);
    this.drawerRef.close();
  }
}