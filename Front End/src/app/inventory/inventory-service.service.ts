import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {

  constructor(private http:HttpClient) { 
    this.http = http;
  }

  Add_UpdateInventory (formData : FormData){
    return this.http.post("https://localhost:7089/api/Inventorys/Add_UpdateInventory",formData);
  }
  
  GetInventory(){
    return this.http.get<any>("https://localhost:7089/api/Inventorys/ViewInventorysList");
  }

  DeleteInventory (id : any){
    return this.http.delete(`https://localhost:7089/api/Inventorys/DeleteInventory?InventoryID=${id}`);
  }
}
