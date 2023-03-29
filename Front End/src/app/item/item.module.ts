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
import { ItemDrawerComponent } from './item-drawer/item-drawer.component';
import { ItemCComponent } from './item-c/item-c.component';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

const routes: Routes = [
  { path: '', component: ItemDrawerComponent }
];


@NgModule({
  declarations: [
    ItemCComponent,
    ItemDrawerComponent
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
    FormsModule,
    NzSelectModule
  ],
  exports: [RouterModule],
  bootstrap: [ItemCComponent],
  providers:[NzDrawerService,NzNotificationService]
})
export class ItemModule { }
