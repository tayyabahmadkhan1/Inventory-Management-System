import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http:HttpClient) { 
    this.http = http;
  }

  Add_UpdateItem (formData : FormData){
    return this.http.post("https://localhost:7089/api/Items/Add_UpdateItem",formData);
  }
  
  GetItem(){
    return this.http.get<any>("https://localhost:7089/api/Items/ViewItemsList");
  }

  DeleteItem (id : any){
    return this.http.delete(`https://localhost:7089/api/Items/DeleteItem?ItemID=${id}`);
  }
  
}
