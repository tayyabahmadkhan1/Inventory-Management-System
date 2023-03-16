import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseCComponent } from './warehouse-c/warehouse-c.component';
import { RouterModule,Routes } from '@angular/router';
import { WarehouseDrawerComponent } from './warehouse-drawer/warehouse-drawer.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: WarehouseDrawerComponent }
];

@NgModule({
  declarations: [
    WarehouseCComponent,
    WarehouseDrawerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzFormModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  bootstrap: [WarehouseCComponent],
  providers:[NzDrawerService]
})
export class WarehouseModule { }
