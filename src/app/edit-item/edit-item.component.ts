import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Output() onClickCancel: EventEmitter<any> = new EventEmitter();

  private title = "test";

  constructor() { }

  ngOnInit() {
    console.warn("init edit");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes");
    console.log(changes['item'].currentValue);
  }

  onCancel() {
    this.onClickCancel.emit(this.item);
  }

  onsubmit() {

  }

}
