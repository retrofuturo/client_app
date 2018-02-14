import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { Observable } from "rxjs/Observable";

import { Client } from "../../models/Client";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;

  constructor(
    public route: ActivatedRoute,
    public clientService: ClientService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe( client => {
      this.client = client;
      console.log(this.client);
    });

  }

  deleteClient(){
    this.clientService.deleteClient(this.client);
  }

}
