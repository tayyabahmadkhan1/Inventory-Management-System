import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCComponent } from './admin-c/admin-c.component';
import { RouterModule,Routes } from '@angular/router';
import { AdminDrawerComponent } from './admin-drawer/admin-drawer.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';


const routes: Routes = [
  // { path: '', component: AdminCComponent },
  { path: '', component: AdminDrawerComponent }
];

@NgModule({
  declarations: [
    AdminCComponent,
    AdminDrawerComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzFormModule,
    ReactiveFormsModule,
    NzDrawerModule,
    NzButtonModule,
    NzListModule,
    NzTableModule
  ],
  exports: [RouterModule],
  bootstrap: [AdminCComponent],
  providers:[NzDrawerService]
})
export class AdminModule { }
