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
import { OrderDrawerComponent } from './order-drawer/order-drawer.component';
import { OrderCComponent } from './order-c/order-c.component';

const routes: Routes = [
  { path: '', component: OrderDrawerComponent }
];

@NgModule({
  declarations: [
    OrderCComponent,
    OrderDrawerComponent
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
    NzCardModule
  ],
  exports: [RouterModule],
  bootstrap: [OrderCComponent],
  providers:[NzDrawerService,NzNotificationService]
})
export class OrderModule { }