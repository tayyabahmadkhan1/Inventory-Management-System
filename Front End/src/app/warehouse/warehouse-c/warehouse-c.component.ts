import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { WarehouseServiceService } from '../warehouse-service.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-warehouse-c',
  templateUrl: './warehouse-c.component.html',
  styleUrls: ['./warehouse-c.component.css']
})
export class WarehouseCComponent {
  @Input() value: any;
  WarehouseForm :FormGroup
  serviceObject: WarehouseServiceService;

  constructor(private drawerRef: NzDrawerRef<string>, _serviceObject : WarehouseServiceService) {
    this.WarehouseForm = new FormGroup({

      'WarehouseLocation': new FormControl('')
    })

    this.serviceObject = _serviceObject;
  }

  ngOnInit() {
    this.WarehouseForm.get('WarehouseLocation')?.setValue(this.value.warehouse_location)
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
    
    this.serviceObject.AddWarehouse(formData);

    this.drawerRef.close();
  }

}