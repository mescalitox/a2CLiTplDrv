import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit, OnChanges {

  @Input() item: any;

  @Input() isActive: boolean;

  @Input() isEdited: boolean;


  constructor() { }

  ngOnInit() {
    // console.warn("init item.id : " + this.item.id + " isActive : " + this.isActive);
  }

  ngOnChanges() {
    // console.warn("chg item.id : " + this.item.id + " isActive : " + this.isActive);
  }



}
