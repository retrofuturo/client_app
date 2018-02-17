import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { Client } from "../../models/Client";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public clientService: ClientService,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe( client => {
      if (client) {
        if ( client.balance > 0 ) {
          this.hasBalance = true;
        }
      }

      this.client = client;
    });

  }

  deleteClient(){
    if ( confirm('Are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client has been removed successfully', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }


  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    })
  }

}
