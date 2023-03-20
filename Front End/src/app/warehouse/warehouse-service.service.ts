import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WarehouseServiceService {

  constructor(private http:HttpClient) { 
    this.http = http;
  }

  AddWarehouse (formData : FormData){

    return this.http.post("https://localhost:7089/api/Warehouses/Add_UpdateWarehouse",formData);
  }
  
  GetWarehouse(){
    return this.http.get<any>("https://localhost:7089/api/Warehouses/ViewWarehousesList");
  }

  DeleteWarehouse (id : any){
    console.log("ID",id)
    return this.http.delete(`https://localhost:7089/api/Warehouses/DeleteWarehouse?WarehouseID=${id}`);
  }
}
