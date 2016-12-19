import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, OnChanges {

  @Input() item: any;

  private title = "test";

  constructor() { }

  ngOnInit() {
    console.warn("init edit");
  }

  ngOnChanges() {
    console.warn("chg edit");
  }

}
