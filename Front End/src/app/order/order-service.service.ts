import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http:HttpClient) { 
    this.http = http;
  }

  Add_UpdateOrder (formData : FormData){
    return this.http.post("https://localhost:7089/api/Orders/Add_UpdateOrder",formData);
  }
  
  GetOrder(){
    return this.http.get<any>("https://localhost:7089/api/Orders/ViewOrdersList");
  }

  GetItem(){
    return this.http.get<any>("https://localhost:7089/api/Items/ViewItemsList");
  }

  DeleteOrder (id : any){
    return this.http.delete(`https://localhost:7089/api/Orders/DeleteOrder?OrderID=${id}`);
  }
}