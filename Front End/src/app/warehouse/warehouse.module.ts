import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseCComponent } from './warehouse-c/warehouse-c.component';
import { RouterModule,Routes } from '@angular/router';
import { WarehouseDrawerComponent } from './warehouse-drawer/warehouse-drawer.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzListModule } from 'ng-zorro-antd/list';
import {NzNotificationService} from 
'ng-zorro-antd/notification';

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
    ReactiveFormsModule,
    NzTypographyModule,
    NzListModule,
    NzButtonModule
  ],
  exports: [RouterModule],
  bootstrap: [WarehouseCComponent],
  providers:[NzDrawerService,NzNotificationService]
})
export class WarehouseModule { }
