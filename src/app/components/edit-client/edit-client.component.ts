import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";
import {ActivatedRoute, Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

import { Client } from "../../models/Client";


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client;


  constructor(
    public route: ActivatedRoute,
    public clientService: ClientService,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe( client => {

      this.client = client;
    });
  }

  onSubmit(form){
    if ( !form.valid ) {
      this.flashMessage.show("Please enter form", {
        timeout: 4000,
        cssClass: "alert-danger"
      });
    } else {
      this.clientService.updateClient(this.client);
      this.flashMessage.show('The client has been edited successfully', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}
