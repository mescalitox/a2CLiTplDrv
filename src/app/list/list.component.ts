import { UserManagerService } from './../shared/user-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private title: string = "Liste Users"

  private listItems: any[];

  private currentItem: any;

  constructor(private userManagerService: UserManagerService) { }

  ngOnInit() {
    this.userManagerService.getUsers().then(users => { this.listItems = users });
  }

  onSelect(item: any) {
    this.currentItem = item;
  }

}
