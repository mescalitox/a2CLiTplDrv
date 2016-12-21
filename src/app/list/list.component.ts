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

  private currentEditedItem: any;

  constructor(private userManagerService: UserManagerService) { }

  ngOnInit() {
    this.userManagerService.getUsers().then(users => { this.listItems = users });
  }

  onSelect(item: any) {
    this.currentItem = item;
    this.currentEditedItem = null;
    console.warn("onSelect");
  }

  onEdit(item: any) {
    this.currentEditedItem = Object.assign({}, this.currentItem);
    console.warn("onEdit");
  }

  onRemove(item: any) {

    console.warn("onRemove");
  }

  onCancel(item: any) {
    this.currentEditedItem = null;
    console.warn("onCancel");
  }

  onValidSubmitEdit(majItem: any) {
    //remplacement dans la liste
    this.listItems.splice(this.listItems.findIndex(u => u.id === majItem.id), 1, majItem);
    //mis à null car currentItem pointe vers un ancien objet inexistant
    this.currentItem = null
  }


}
