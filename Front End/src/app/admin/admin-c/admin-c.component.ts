import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-admin-c',
  templateUrl: './admin-c.component.html',
  styleUrls: ['./admin-c.component.css']
})
export class AdminCComponent {

  @Input() value: any;
  AdminForm :FormGroup

  constructor(private drawerRef: NzDrawerRef<string>, private http: HttpClient) {
    this.AdminForm = new FormGroup({
      'AdminName': new FormControl(''),
      'Username': new FormControl(''),
      'AdminPassword': new FormControl('')
    })
  }

  ngOnInit() {

    this.AdminForm.get('AdminName')?.setValue(this.value.name)

    this.AdminForm.get('Username')?.setValue(this.value.username)

    this.AdminForm.get('AdminPassword')?.setValue(this.value.password)

  }
  
  onSubmit() {

    let formData = new FormData();
    if(this.value.a_Id==null)
    {
      
    formData.append('name', this.AdminForm.value.AdminName);
    formData.append('username', this.AdminForm.value.Username);
    formData.append('password', this.AdminForm.value.AdminPassword);
    }
    else{
      
    formData.append('name', this.AdminForm.value.AdminName);
    formData.append('username', this.AdminForm.value.Username);
    formData.append('password', this.AdminForm.value.AdminPassword);
    formData.append('a_id', this.value.a_Id);
    }
    

    this.http.post('https://localhost:7089/api/Admin/Add_UpdateAdmin', formData ).subscribe(
      (response) => console.log(response)
    );

    this.drawerRef.close();
  }
}