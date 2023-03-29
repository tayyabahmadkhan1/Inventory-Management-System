import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AbstractControl } from '@angular/forms';

//Custom Validators for Email & Password.
function PasswordValidator(control: AbstractControl) {
  if (control.value && !control.value?.includes('TM')) {
    return { invalidPassword: true };
  }
  return null;
}

function EmailValidator(control: AbstractControl) {
  if (control.value && !control.value?.endsWith('@stallions.tech')) {
    return { invalidEmail: true };
  }
  return null;
}


@Component({
  selector: 'app-admin-c',
  templateUrl: './admin-c.component.html',
  styleUrls: ['./admin-c.component.css']
})

export class AdminCComponent {

  @Input() value: any;
  @Input() getA !:()=>void;
  AdminForm :FormGroup
  visible = true;
  flag=true;

  constructor(private drawerRef: NzDrawerRef<string>, private http: HttpClient) {
    this.AdminForm = new FormGroup({
      'AdminName': new FormControl('',[Validators.required]),
      'Username': new FormControl('',[Validators.required, EmailValidator]),
      'AdminPassword': new FormControl('', [Validators.required, PasswordValidator,Validators.minLength(8)])
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
      (response) => {console.log(response);
        this.getA();
      }
    );

    this.drawerRef.close();
  }
}