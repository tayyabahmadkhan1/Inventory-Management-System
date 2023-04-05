import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzListModule } from 'ng-zorro-antd/list';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import {NzCardModule} from 	'ng-zorro-antd/card';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import { FormsModule } from '@angular/forms';
import { InventoryCComponent } from './inventory-c/inventory-c.component';


const routes: Routes = [
  { path: '', component: InventoryCComponent } 
];

@NgModule({
  declarations: [
    InventoryCComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzFormModule,
    ReactiveFormsModule,
    NzTypographyModule,
    NzListModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzCardModule,
    FormsModule
  ],
  exports: [RouterModule],
  bootstrap: [InventoryCComponent],
  providers:[NzDrawerService,NzNotificationService]
})

export class InventoryModule { }